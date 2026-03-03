// composables/useSpotifyNowPlaying.ts

import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

export const useSpotifyNowPlaying = () => {
    const { data, pending, error, refresh } = useFetch('/api/spotify/now-playing', {
        key: 'spotify-now-playing',
    })

    const localProgressMs = ref(0)
    const currentTrackId = ref<string | null>(null)
    let timeoutId: any = null

    const updateProgress = () => {
        if (data.value?.is_playing && data.value.timestamp) {
            const now = Date.now()
            const elapsedSinceSync = now - data.value.timestamp

            const calculated = data.value.progress_ms + elapsedSinceSync

            localProgressMs.value = Math.min(calculated, data.value.duration_ms || 0)

            if (localProgressMs.value >= (data.value.duration_ms || 0)) {
                if (!pending.value) refresh()
            }
        }

        timeoutId = setTimeout(updateProgress, 500)
    }

    // Следим за изменением данных
    watch(data, (newData) => {
        if (newData) {
            if (newData.id !== currentTrackId.value) {
                currentTrackId.value = newData.id
                localProgressMs.value = newData.progress_ms || 0
            }
        }
    }, { immediate: true })

    onMounted(() => {
        updateProgress()
    })

    onUnmounted(() => {
        clearTimeout(timeoutId)
    })

    const animatedProgress = computed(() => {
        const duration = data.value?.duration_ms || 0
        if (duration === 0) return 0
        return Math.min((localProgressMs.value / duration) * 100, 100)
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