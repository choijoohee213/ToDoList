'use strict'

const API_KEY = 'e1d3e1211831869dc85d4347aa4f0cc9',
  weather = document.querySelector('.js-weather')

function init() {
  loadCoords()
}

//* 위치 좌표 *//
function loadCoords() {
  const loadedCoords = localStorage.getItem('COORDS')
  if (loadedCoords === null) {
    askForCoords()
  } else {
    parseCoords()
  }
}

function saveCoords(coordsObj) {
  localStorage.setItem('COORDS', JSON.stringify(coordsObj))
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError)
}

function parseCoords() {
  const parsedCoords = JSON.parse(localStorage.getItem('COORDS'))
  getWeather(parsedCoords.latitude, parsedCoords.longitude)
}

function handleGeoSucess(position) {
  const latitude = position.coords.latitude,
    longitude = position.coords.longitude

  const coordsObj = {
    latitude,
    longitude,
  }
  saveCoords(coordsObj)
  getWeather(latitude, longitude)
}

function handleGeoError(position) {
  weather.innerHTML = ''
}

//* 날씨 *//
function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      const temp = json.main.temp,
        cityName = json.name
      weather.innerHTML = `${temp}℃ @${cityName}`
    })
}

init()
