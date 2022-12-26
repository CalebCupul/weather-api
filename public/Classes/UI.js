import { alertContent, outerDiv, cityInput, form, content, contentCityName, contentDataTime, contentIcon, contentTemperature, contentWeather, contentMinTemperature, contentWind, contentHumidity, timeDisplay } from "../selectors.js"
import { dateTimeConversion, dateConversion, kelvinToCelsius, milesToKilometers, getWeatherIcon, timeConversion } from "../Utils/utils.js"
class UI {
    loadCityWeather(name, list) {
        this.cleanErrors()
        alertContent.classList.add('hidden')
        content.classList.remove('hidden')
        const { dt_txt: dateTime, main: { humidity, temp, temp_min }, wind: { speed: wind }, weather: [{ description: weather, main: weatherIcon }] } = list[0]

        content.classList.remove('hidden')
        contentIcon.src = getWeatherIcon(weatherIcon, dateTime)

        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        contentDataTime.textContent = dateTimeConversion(dateTime, options)
        contentCityName.textContent = name

        contentTemperature.textContent = kelvinToCelsius(temp)
        contentMinTemperature.textContent = kelvinToCelsius(temp_min)
        contentHumidity.textContent = humidity + ' %'
        contentWind.textContent = milesToKilometers(wind)

        contentWeather.textContent = weather.charAt(0).toUpperCase() + weather.slice(1)

        this.loadWeatherPrediction(list)
    }

    loadWeatherPrediction(predictions) {
        content.removeChild(content.lastChild)
        const { dt_txt: dateTime } = predictions[0]
        const time = timeConversion(dateTime)
        const weatherPrediction = predictions.filter(prediction => timeConversion(prediction.dt_txt) === time)
        weatherPrediction.shift()
        const container = document.createElement('div')
        container.classList = 'grid place-items-center grid-cols-2 grid-rows-2 gap-4 mt-2 mb-4'

        weatherPrediction.forEach(day => {
            const { dt_txt: itemDate, main: { temp }, weather: [{ description: weather, main: weatherIcon }] } = day

            const innerContainer = document.createElement('div')
            const date = document.createElement('h1')
            date.classList = 'text-sm text-white font-bold'
            date.textContent = dateConversion(itemDate, { month: 'short', day: 'numeric' })

            const innerDiv = document.createElement('div')
            innerDiv.classList = 'bg-gray-500 w-20 h-40 rounded-full bg-opacity-60 grid place-items-center'

            const weatherType = document.createElement('h5')
            weatherType.classList = 'text-white text-sm mt-1'
            weatherType.textContent = weather.charAt(0).toUpperCase() + weather.slice(1)

            const weatherTypeIcon = document.createElement('img')
            weatherTypeIcon.classList = 'w-16'
            weatherTypeIcon.src = getWeatherIcon(weatherIcon, dateTime)

            const weatherTemperature = document.createElement('h3')
            weatherTemperature.classList = 'text-white text-base'
            weatherTemperature.textContent = kelvinToCelsius(temp)


            innerDiv.appendChild(weatherType)
            innerDiv.appendChild(weatherTypeIcon)
            innerDiv.appendChild(weatherTemperature)

            innerContainer.appendChild(date)
            innerContainer.appendChild(innerDiv)
            container.appendChild(innerContainer)


        });
        content.appendChild(container)
        outerDiv.classList.remove('h-4/6')
    }

    alert(error) {
        if (!outerDiv.classList.contains('h-4/6')) { outerDiv.classList.add('h-4/6') }
        alertContent.classList.remove('hidden')
        content.classList.add('hidden')
        const message = document.createElement('h1')
        message.textContent = 'Oops...'
        message.classList = 'text-xl'

        const p = document.createElement('p')
        p.textContent = error
        p.classList = 'text-xs mt-2'
        message.appendChild(p)
        alertContent.appendChild(message)
    }

    refreshTime = () => timeDisplay.textContent = timeConversion(new Date())
    
    cleanErrors() {
        while (alertContent.firstChild) {
            alertContent.removeChild(alertContent.firstChild)
        }
    }
}

export default UI