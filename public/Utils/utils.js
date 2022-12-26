export function dateTimeConversion(dateTime, options) {

    const timeOptions = { hour: '2-digit', minute: '2-digit' }
    const date = new Date(dateTime)

    return date.toLocaleDateString('en-us', options) + ', ' + date.toLocaleTimeString("en-us", timeOptions)
}

export function getWeatherIcon(weather, dateTime) {
    const time = new Date(dateTime).toLocaleTimeString()
    const isDay = time >= '08:00:00' && time < '20:00:00'

    switch (weather) {
        case 'Thunderstorm':
            return './public/icons/animated/thunder.svg'
        case 'Drizzle':
            return '.public/icons/animated/rainy-5.svg'
        case 'Rain':
            return '.public/icons/animated/rainy-6.svg'
        case 'Snow':
            return '.public/icons/animated/snowy-6.svg'
        case 'Clear':
            return isDay ? '.public/icons/animated/day.svg' : './public/icons/animated/night.svg'
        case 'Clouds':
            return isDay ? '.public/icons/animated/cloudy-day-3.svg' : './public/icons/animated/cloudy-night-3.svg'
        default:
            break;
    }
}

export function timeConversion(dateTime) {
    const timeOptions = { hour: '2-digit', minute: '2-digit' }
    return new Date(dateTime).toLocaleTimeString("en-us", timeOptions)
}

export const kelvinToCelsius = temperature => parseInt(temperature - 273.15) + '°C'
export const milesToKilometers = miles => parseInt(miles * 1.609344) + ' Km/h'
export const dateConversion = (dateTime, options) => new Date(dateTime).toLocaleDateString('en-us', options)


