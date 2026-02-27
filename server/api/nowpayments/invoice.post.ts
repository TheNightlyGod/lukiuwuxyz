// server/api/nowpayments/invoice.post.ts

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const NOWPAYMENTS_TOKEN = process.env.NOWPAYMENTS_TOKEN

    const amount = parseFloat(body.amount)
    if (!amount || amount <= 0) {
        throw createError({ statusCode: 400, message: 'Некорректная сумма' })
    }

    const orderId = String(Math.floor(Math.random() * 9999999999))

    try {
        const response = await $fetch<any>('https://api.nowpayments.io/v1/payment', {
            method: 'POST',
            headers: {
                'x-api-key': NOWPAYMENTS_TOKEN,
                'Content-Type': 'application/json',
            },
            body: {
                price_amount: amount,
                price_currency: 'usd',
                pay_currency: body.pay_currency || 'ton',
                order_id: orderId,
                order_description: body.comment || 'Донат',
            },
        })

        return response
    } catch (err: any) {
        throw createError({
            statusCode: 502,
            message: err?.message || 'Ошибка при создании счёта NOWPayments',
        })
    }
})