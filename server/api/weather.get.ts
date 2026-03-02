// server/api/weather.get.ts

export default defineEventHandler(async () => {
    try {
        const data = await $fetch<any>('https://api.open-meteo.com/v1/forecast', {
            query: {
                latitude: 55.7558,
                longitude: 37.6173,
                current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
                timezone: 'Europe/Moscow',
            },
        })

        if (!data?.current) {
            throw new Error('No data from Open-Meteo')
        }

        const current = data.current
        const weatherCode = current.weather_code

        const weatherInfo = getWeatherDescription(weatherCode)

        return {
            temperature: Math.round(current.temperature_2m),
            feels_like: Math.round(current.apparent_temperature),
            humidity: current.relative_humidity_2m,
            wind_speed: Math.round(current.wind_speed_10m * 10) / 10,
            precipitation: current.precipitation,
            description: weatherInfo.description,
            icon: weatherInfo.icon,
            is_day: data.current.is_day ?? true,
            timestamp: current.time,
        }
    } catch (err: any) {
        console.error('Weather error:', err?.message || err)

        throw createError({
            statusCode: 502,
            message: 'Error loadin weather data.',
        })
    }
})

function getWeatherDescription(code: number) {
    const map: Record<number, { description: string; icon: string }> = {
        0:  { description: 'Clear',               icon: '☀️' },
        1:  { description: 'Mostly clear',        icon: '🌤️' },
        2:  { description: 'Partly cloudy',       icon: '⛅' },
        3:  { description: 'Overcast',            icon: '☁️' },
        45: { description: 'Fog',                 icon: '🌫️' },
        48: { description: 'Depositing rime fog', icon: '🌫️' },
        51: { description: 'Light drizzle',       icon: '🌧️' },
        53: { description: 'Drizzle',             icon: '🌧️' },
        55: { description: 'Heavy drizzle',       icon: '🌧️' },
        61: { description: 'Light rain',          icon: '🌧️' },
        63: { description: 'Rain',                icon: '🌧️' },
        65: { description: 'Heavy rain',          icon: '🌧️' },
        71: { description: 'Light snow',          icon: '❄️' },
        73: { description: 'Snow',                icon: '❄️' },
        80: { description: 'Rain showers',        icon: '⛈️' },
    }

    return map[code] || { description: 'Неизвестно', icon: '🌤️' }
}