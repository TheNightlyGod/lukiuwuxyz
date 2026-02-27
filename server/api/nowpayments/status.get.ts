// server/api/nowpayments/status.get.ts

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const paymentId = query.paymentId

    if (!paymentId) {
        throw createError({ statusCode: 400, message: 'paymentId обязателен' })
    }

    const NOWPAYMENTS_TOKEN = process.env.NOWPAYMENTS_TOKEN

    try {
        const response = await $fetch<any>(
            `https://api.nowpayments.io/v1/payment/${paymentId}`,
            {
                method: 'GET',
                headers: {
                    'x-api-key': NOWPAYMENTS_TOKEN,
                },
            }
        )

        return response
    } catch (err: any) {
        throw createError({
            statusCode: 502,
            message: err?.message || 'Ошибка при проверке статуса NOWPayments',
        })
    }
})