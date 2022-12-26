import { alertContent, cityInput, form, content, contentCityName, contentDataTime, contentIcon, contentTemperature, contentWeather, contentMinTemperature, contentWind, contentHumidity } from "../selectors.js"
import { dateConversion, kelvinToCelsius, milesToKilometers, getWeatherIcon} from "../Utils/utils.js"
class UI {
    loadCityWeather(name, list) {
        this.cleanErrors()
        alertContent.classList.add('hidden')
        content.classList.remove('hidden')
        const { dt_txt: dateTime, main: { humidity, temp, temp_min }, wind: { speed: wind }, weather: [{ description: weather, main: weatherIcon}] } = list[0]
        
        content.classList.remove('hidden')
        contentIcon.src = getWeatherIcon(weatherIcon, dateTime)
        contentDataTime.textContent = dateConversion(dateTime)
        contentCityName.textContent = name

        contentTemperature.textContent = kelvinToCelsius(temp)
        contentMinTemperature.textContent = kelvinToCelsius(temp_min)
        contentHumidity.textContent = humidity + ' %'
        contentWind.textContent = milesToKilometers(wind)
        
        contentWeather.textContent = weather.charAt(0).toUpperCase() + weather.slice(1)
    }

    alert(error) {
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

    cleanErrors() {

        while(alertContent.firstChild) {
            alertContent.removeChild(alertContent.firstChild)
        }
    }
}

export default UI