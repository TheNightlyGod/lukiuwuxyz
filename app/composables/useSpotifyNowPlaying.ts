// composables/useSpotifyNowPlaying.ts

import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

export const useSpotifyNowPlaying = () => {
    const { data, pending, error, refresh } = useFetch('/api/spotify/now-playing', {
        key: 'spotify-now-playing',
    })

    const localProgressMs = ref(0)
    let animationFrame: number | null = null

    const updateProgress = () => {
        if (data.value?.is_playing && data.value.timestamp) {
            const now = Date.now()
            const elapsedSinceSync = now - data.value.timestamp
            const currentProgress = data.value.progress_ms + elapsedSinceSync

            localProgressMs.value = Math.min(currentProgress, data.value.duration_ms || Infinity)

            if (localProgressMs.value >= data.value.duration_ms) {
                setTimeout(() => refresh(), 1000)
                return
            }
        }

        animationFrame = window.setTimeout(updateProgress, 250)
    }

    watch(data, (newTrack) => {
        if (!newTrack?.is_playing) {
            localProgressMs.value = newTrack?.progress_ms || 0
        }
    }, { immediate: true })

    onMounted(() => {
        updateProgress()
    })

    onUnmounted(() => {
        if (animationFrame) clearTimeout(animationFrame)
    })

    const animatedProgress = computed(() => {
        if (!data.value?.duration_ms) return 0
        return Math.min(Math.max((localProgressMs.value / data.value.duration_ms) * 100, 0), 100)
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