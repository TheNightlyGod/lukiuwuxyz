// composables/useSpotifyNowPlaying.ts

export const useSpotifyNowPlaying = () => {
    const { data, pending, error, refresh } = useFetch('/api/spotify/now-playing', {
        key: 'spotify-now-playing',
    })

    const localProgressMs = ref(0)
    const lastTickTime = ref(Date.now())
    let timer: any = null
    let pollInterval: any = null
    let lastRefreshTime = 0

    const throttledRefresh = () => {
        const now = Date.now()
        if (now - lastRefreshTime > 5000) {
            lastRefreshTime = now
            refresh()
        }
    }

    const tick = () => {
        if (data.value?.is_playing) {
            const now = Date.now()
            const delta = now - lastTickTime.value
            lastTickTime.value = now

            localProgressMs.value += delta

            if (localProgressMs.value >= (data.value.duration_ms || 0)) {
                localProgressMs.value = data.value.duration_ms || 0
                if (!pending.value) throttledRefresh()
            }
        } else {
            lastTickTime.value = Date.now()
        }

        timer = requestAnimationFrame(tick)
    }

    watch(data, (newTrack) => {
        if (newTrack) {
            let initialProgress = newTrack.progress_ms || 0

            if (newTrack.is_playing && newTrack.timestamp) {
                const elapsed = Date.now() - newTrack.timestamp
                if (Math.abs(elapsed) < 30000) {
                    initialProgress = Math.max(0, Math.min(initialProgress + elapsed, newTrack.duration_ms || 0))
                }
            }

            localProgressMs.value = initialProgress
            lastTickTime.value = Date.now()
        }
    }, { immediate: true })

    onMounted(() => {
        timer = requestAnimationFrame(tick)
        pollInterval = setInterval(() => {
            if (!pending.value) refresh()
        }, 15000)
    })

    onUnmounted(() => {
        if (timer) cancelAnimationFrame(timer)
        if (pollInterval) clearInterval(pollInterval)
    })

    const animatedProgress = computed(() => {
        const duration = data.value?.duration_ms || 0
        if (!duration) return 0
        return Math.min((localProgressMs.value / duration) * 100, 100)
    })

    return {
        track: data,
        pending,
        refresh,
        animatedProgress,
        localProgressMs
    }
}