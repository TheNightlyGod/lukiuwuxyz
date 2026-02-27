// server/api/rocket/invoice.post.ts

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const ROCKET_TOKEN = process.env.ROCKET_TOKEN

    const amount = parseFloat(body.amount)
    if (!amount || amount <= 0) {
        throw createError({ statusCode: 400, message: 'Некорректная сумма' })
    }

    try {
        const response = await $fetch<any>('https://pay.xrocket.tg/tg-invoices', {
            method: 'POST',
            headers: {
                'Nonce': Date.now().toString(),
                'Rocket-Pay-Key': `${ROCKET_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: {
                amount,
                currency: body.currency || 'USDT',
                description: body.comment || 'Донат',
                payload: body.name || '',
                commentsEnabled: true,
                expiredIn: 7200,
            },
        })

        return response
    } catch (err: any) {
        throw createError({
            statusCode: 502,
            message: err?.message || 'Ошибка при создании счёта Rocket',
        })
    }
})