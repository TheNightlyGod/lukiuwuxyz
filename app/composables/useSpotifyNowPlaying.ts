// composables/useSpotifyNowPlaying.ts
export const useSpotifyNowPlaying = () => {
    const { data, pending, error, refresh } = useFetch('/api/spotify/now-playing', {
        key: 'spotify-now-playing',
    })

    const localProgressMs = ref(0)
    const lastTickTime = ref(Date.now())
    let timer: any = null

    const tick = () => {
        if (data.value?.is_playing) {
            const now = Date.now()
            const delta = now - lastTickTime.value
            lastTickTime.value = now

            localProgressMs.value += delta

            if (localProgressMs.value >= (data.value.duration_ms || 0)) {
                localProgressMs.value = data.value.duration_ms || 0
                if (!pending.value) refresh()
            }
        } else {
            lastTickTime.value = Date.now()
        }

        timer = requestAnimationFrame(tick)
    }

    watch(data, (newTrack) => {
        if (newTrack) {
            localProgressMs.value = newTrack.progress_ms || 0
            lastTickTime.value = Date.now()
        }
    }, { immediate: true })

    onMounted(() => {
        timer = requestAnimationFrame(tick)
    })

    onUnmounted(() => {
        if (timer) cancelAnimationFrame(timer)
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