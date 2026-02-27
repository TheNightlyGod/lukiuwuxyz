// server/api/rocket/status.get.ts

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const invoiceId = query.invoiceId

    if (!invoiceId) {
        throw createError({ statusCode: 400, message: 'invoiceId обязателен' })
    }

    const ROCKET_TOKEN = process.env.ROCKET_TOKEN

    try {
        const response = await $fetch<any>(
            `https://pay.xrocket.tg/tg-invoices/${invoiceId}`,
            {
                method: 'GET',
                headers: {
                    'Nonce': Date.now().toString(),
                    'Rocket-Pay-Key': `${ROCKET_TOKEN}`,
                },
            }
        )

        return response
    } catch (err: any) {
        throw createError({
            statusCode: 502,
            message: err?.message || 'Ошибка при проверке статуса Rocket',
        })
    }
})