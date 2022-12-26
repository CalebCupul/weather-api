import { cityInput, form, content, contentCityName, contentDataTime, contentIcon, contentTemperature, contentWeather, contentMinTemperature, contentWind, contentHumidity } from "../selectors.js"
import { dateConversion, kelvinToCelsius, milesToKilometers, getWeatherIcon} from "../Utils/utils.js"
class UI {
    loadCityWeather(name, list) {
        const { dt_txt: dateTime, main: { humidity, temp, temp_min }, wind: { speed: wind }, weather: [{ description: weather, main: weatherIcon}] } = list[0]
        console.log(list[0])
        
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

    notFound(message) {

    }
}

export default UI