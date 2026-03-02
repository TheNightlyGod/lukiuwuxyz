// composables/useSpotifyNowPlaying.ts

export const useSpotifyNowPlaying = (pollInterval = 18000) => {
    const { data, pending, error, refresh } = useFetch('/api/spotify/now-playing', {
        key: 'spotify-now-playing',
    })

    const localProgressMs = ref(0)
    let animationInterval: NodeJS.Timeout | null = null
    const expectedEndTime = ref<number | null>(null)

    watch(data, (newTrack) => {
        if (newTrack?.is_playing && newTrack.timestamp && newTrack.duration_ms) {
            const elapsedSinceSnapshot = Date.now() - newTrack.timestamp
            localProgressMs.value = newTrack.progress_ms + elapsedSinceSnapshot

            if (localProgressMs.value >= newTrack.duration_ms) {
                localProgressMs.value = newTrack.duration_ms
            }

            const remaining = newTrack.duration_ms - localProgressMs.value
            expectedEndTime.value = Date.now() + remaining + 1500
        } else {
            localProgressMs.value = 0
            expectedEndTime.value = null
        }
    }, { immediate: true, deep: true })

    onMounted(() => {
        animationInterval = setInterval(() => {
            if (
                data.value?.is_playing &&
                localProgressMs.value < (data.value.duration_ms || Infinity)
            ) {
                localProgressMs.value += 200
            }
        }, 200)

        const endChecker = setInterval(() => {
            if (expectedEndTime.value && Date.now() >= expectedEndTime.value) {
                refresh()
                expectedEndTime.value = null
            }
        }, 4000)

        onUnmounted(() => {
            if (animationInterval) clearInterval(animationInterval)
            clearInterval(endChecker)
        })
    })

    const animatedProgress = computed(() => {
        if (!data.value?.duration_ms || !data.value.is_playing) return 0
        const raw = (localProgressMs.value / data.value.duration_ms) * 100
        return Math.min(Math.max(raw, 0), 100)
    })

    return {
        track: data,
        pending,
        error,
        refresh,
        animatedProgress,
        localProgressMs,
    }
}