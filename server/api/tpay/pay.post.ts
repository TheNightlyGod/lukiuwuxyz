// server/api/tpay/pay.post.ts

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const CLOUDTIPS_LAYOUTID = process.env.CLOUDTIPS_LAYOUTID

    let device = body.device || {
        browser: 'Chrome',
        os: 'Windows',
        type: 3,
        webview: false
    }

    if (typeof device !== 'object' || !device.browser || !device.os) {
        device = {
            browser: 'Unknown',
            os: 'Unknown',
            type: 3,
            webview: false
        }
    }

    device.type = [1,2,3].includes(device.type) ? device.type : 3

    const payload = {
        amount: body.amount,
        cardholderName: "string",
        comment: body.comment || '',
        currency: 'RUB',
        device,
        feeFromPayer: false,
        layoutId: CLOUDTIPS_LAYOUTID,
        name: body.name || '',
    }

    try {
        const response = await $fetch('https://api.cloudtips.ru/api/payment/tpay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
        })

        return response
    } catch (err: any) {
        console.error('CloudTips error:', err?.data || err)
        throw createError({
            statusCode: 502,
            message: err?.message || 'Ошибка при создании платежа',
        })
    }
})