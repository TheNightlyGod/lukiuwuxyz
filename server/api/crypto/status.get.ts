// server/api/crypto/status.get.ts

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const invoiceId = query.invoiceId

    if (!invoiceId) {
        throw createError({ statusCode: 400, message: 'invoiceId обязателен' })
    }

    const CRYPTOBOT_TOKEN = process.env.CRYPTOBOT_TOKEN

    try {
        const response = await $fetch<any>(
            `https://pay.crypt.bot/api/getInvoices?invoice_ids=${invoiceId}`,
            {
                method: 'GET',
                headers: {
                    'Crypto-Pay-API-Token': CRYPTOBOT_TOKEN,
                },
            }
        )

        return response
    } catch (err: any) {
        throw createError({
            statusCode: 502,
            message: err?.message || 'Ошибка при проверке статуса CryptoBot',
        })
    }
})