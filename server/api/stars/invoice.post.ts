// server/api/stars/invoice.post.ts

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const BOT_TOKEN = process.env.BOT_TOKEN

    const usdAmount = parseFloat(body.amount)
    if (!usdAmount || usdAmount <= 0) {
        throw createError({ statusCode: 400, message: 'Некорректная сумма' })
    }

    const stars = Math.ceil(usdAmount * 50)

    const payload = `donate_${body.name || 'anon'}_${Date.now()}`

    try {
        const response = await $fetch<any>(
            `https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`,
            {
                method: 'POST',
                body: {
                    title: 'Донат проекту',
                    description: body.comment || 'Спасибо за поддержку ❤️',
                    payload,
                    provider_token: '',
                    currency: 'XTR',
                    prices: [{ label: `${stars} Stars (~$${usdAmount})`, amount: stars }],
                },
            }
        )

        if (!response.ok) {
            throw new Error(response.description || 'Ошибка Telegram API')
        }

        return { invoice_link: response.result, payload, stars }
    } catch (err: any) {
        throw createError({
            statusCode: 502,
            message: err?.message || 'Ошибка при создании Stars-инвойса',
        })
    }
})