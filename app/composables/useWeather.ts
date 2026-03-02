// composables/useWeather.ts

export const useWeather = (pollInterval = 600000) => {
    const { data, pending, error, refresh } = useFetch('/api/weather', {
        key: 'current-weather',
    })

    onMounted(() => {
        refresh()
        const interval = setInterval(refresh, pollInterval)
        onUnmounted(() => clearInterval(interval))
    })

    return { weather: data, pending, error, refresh }
}