import UI from "./Classes/UI.js"
import { cityInput } from "./selectors.js"
const key = '16e02357a1ee8679524cbe481965f764'

const ui = new UI()

window.addEventListener('load', () => {
    navigator.geolocation.getCurrentPosition(successGeolocationCallback, errorGeolocationCallback)
    form.addEventListener('submit', getWeatherByCity)
})

function successGeolocationCallback(position) {
    getWeatherByCoordinates(position)
}

function errorGeolocationCallback(error) {

}

function getWeatherByCoordinates({coords: { latitude: lat, longitude: lon }}) {

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if ( data.cod === "404" ) {
                // mostrarError('La ciudad no existe')
            }
            const { city: { name }, list } = data
            ui.loadCityWeather(name, list)
        })  
}

function getWeatherByCity(e){
    e.preventDefault()
    
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${key}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if ( data.cod === "404" ) {
                // mostrarError('La ciudad no existe')
            }
            const { city: { name }, list } = data
            ui.loadCityWeather(name, list)
        })  
}

