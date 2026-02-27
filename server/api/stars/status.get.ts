// server/api/stars/status.get.ts

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const payload = query.payload as string

    if (!payload) {
        throw createError({ statusCode: 400, message: 'payload обязателен' })
    }

    const storage = useStorage('payments')
    const payment = await storage.getItem(payload)

    return {
        status: payment ? 'paid' : 'pending',
        data: payment || null,
    }
})