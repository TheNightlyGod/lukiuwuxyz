// server/api/spotify/now-playing.get.ts

export default defineEventHandler(async () => {
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
    const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
        throw createError({
            statusCode: 500,
            message: 'Spotify credentials not set in .env',
        })
    }

    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

    try {
        const tokenRes = await $fetch<any>('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: REFRESH_TOKEN,
            }).toString(),
        })

        const accessToken = tokenRes.access_token
        if (!accessToken) {
            throw new Error('Failed update token Spotify')
        }

        const playing = await $fetch<any>('https://api.spotify.com/v1/me/player/currently-playing?market=ES', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!playing || !playing.item) {
            return {
                is_playing: false,
                track_name: null,
                artist: null,
                album_cover: null,
                track_url: null,
                progress_ms: 0,
                duration_ms: 0,
            }
        }

        const item = playing.item
        const artists = item.artists?.map(a => a.name).join(', ') || 'Unknown Artist'

        const album_cover = item.album?.images?.[0]?.url || null

        return {
            is_playing: playing.is_playing ?? false,
            track_name: item.name || 'Unknown Track',
            artist: artists,
            album_cover,
            track_url: item.external_urls?.spotify || null,
            progress_ms: playing.progress_ms ?? 0,
            duration_ms: item.duration_ms ?? 0,
            timestamp: playing.timestamp ?? null,
        }
    } catch (err: any) {
        if (err?.response?.status === 204) {
            return {
                is_playing: false,
                track_name: null,
                artist: null,
                album_cover: null,
                track_url: null,
                progress_ms: 0,
                duration_ms: 0,
            }
        }

        console.error('Spotify now-playing error:', err?.data || err?.message)

        throw createError({
            statusCode: 502,
            message: 'Error loadin data from Spotify',
        })
    }
})