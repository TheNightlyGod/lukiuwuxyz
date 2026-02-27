// server/api/cryptobot/invoice.post.ts

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const CRYPTOBOT_TOKEN = process.env.CRYPTOBOT_TOKEN

    const amount = parseFloat(body.amount)
    if (!amount || amount <= 0) {
        throw createError({ statusCode: 400, message: 'Некорректная сумма' })
    }

    try {
        const response = await $fetch<any>('https://pay.crypt.bot/api/createInvoice', {
            method: 'POST',
            headers: {
                'Crypto-Pay-API-Token': CRYPTOBOT_TOKEN,
                'Content-Type': 'application/json',
            },
            body: {
                currency_type: 'fiat',
                fiat: 'USD',
                accepted_assets: 'USDT,TON,BTC,ETH,LTC',
                amount: String(amount),
                description: body.comment || 'Донат',
                payload: body.name || '',
                allow_comments: true,
                allow_anonymous: true,
            },
        })

        return response
    } catch (err: any) {
        throw createError({
            statusCode: 502,
            message: err?.message || 'Ошибка при создании счёта CryptoBot',
        })
    }
})