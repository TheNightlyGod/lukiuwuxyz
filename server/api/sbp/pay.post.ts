// server/api/sbp/pay.post.ts
// Проксирует POST https://api.cloudtips.ru/api/payment/sbp
// Нужен чтобы обойти CORS и скрыть layoutId на сервере

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const CLOUDTIPS_LAYOUTID = process.env.CLOUDTIPS_LAYOUTID

    const userAgent = getHeader(event, 'user-agent') || ''
    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent)
    const deviceType = isMobile ? 2 : 3

    const forwardedFor = getHeader(event, 'x-forwarded-for')
    const ipSource = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'

    const payload = {
        amount: body.amount,
        feeFromPayer: false,
        currency: 'RUB',
        name: body.name || '',
        comment: body.comment || '',
        layoutId: CLOUDTIPS_LAYOUTID,
        ipSource,
        Device: {
            Type: deviceType,
            Os: userAgent,
            Webview: false,
            Browser: userAgent,
        },
    }

    try {
        const response = await $fetch<any>('https://api.cloudtips.ru/api/payment/sbp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload,
        })

        return response
    } catch (err: any) {
        throw createError({
            statusCode: 502,
            message: err?.message || 'Ошибка при создании платежа CloudTips',
        })
    }
})