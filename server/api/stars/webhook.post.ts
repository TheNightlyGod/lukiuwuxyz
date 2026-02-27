// server/api/stars/webhook.post.ts

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const BOT_TOKEN = process.env.BOT_TOKEN

    if (body.pre_checkout_query) {
        const query = body.pre_checkout_query

        await $fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerPreCheckoutQuery`, {
            method: 'POST',
            body: {
                pre_checkout_query_id: query.id,
                ok: true,
            },
        })

        return { ok: true }
    }

    if (body.message?.successful_payment) {
        const payment = body.message.successful_payment
        const stars = payment.total_amount
        const payload = payment.invoice_payload
        const userId = body.message.from.id
        const username = body.message.from.username || 'anon'

        const storage = useStorage('payments')
        await storage.setItem(payload, {
            status: 'paid',
            stars,
            payload,
            userId,
            username,
            paidAt: new Date().toISOString(),
        })

        await $fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            body: {
                chat_id: userId,
                text: `✅ Спасибо за ${stars} Stars! 🔥\nТы легенда ❤️`,
                parse_mode: 'Markdown',
            },
        })

        return { ok: true }
    }

    return { ok: true }
})