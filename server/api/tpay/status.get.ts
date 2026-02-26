// server/api/tpay/status.get.ts

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const transactionId = query.transactionId

    if (!transactionId) {
        throw createError({
            statusCode: 400,
            message: 'transactionId обязателен',
        })
    }

    try {
        const response = await $fetch<any>(
            `https://api.cloudtips.ru/api/payment/tpay/status?transactionId=${transactionId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        return response
    } catch (err: any) {
        throw createError({
            statusCode: 502,
            message: err?.message || 'Ошибка при проверке статуса платежа',
        })
    }
})