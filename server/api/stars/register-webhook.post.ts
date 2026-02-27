// server/api/stars/register-webhook.post.ts

export default defineEventHandler(async (event) => {
    const BOT_TOKEN = process.env.BOT_TOKEN
    const SITE_URL = 'https://lukiuwu.xyz'

    const response = await $fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
        {
            method: 'POST',
            body: {
                url: `${SITE_URL}/api/stars/webhook`,
            },
        }
    )

    return response
})