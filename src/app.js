function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#searched-city");
  let descriptionElement = document.querySelector("#weather-description");
  let description = response.data.condition.description;
  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = response.data.temperature.feels_like;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  let pressureElement = document.querySelector("#pressure");
  let pressure = response.data.temperature.pressure;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  let icon = changeIcon(description);
  let dogImage = document.querySelector("#dogImage");

  cityElement.innerHTML = response.data.city;
  iconElement.innerHTML = icon;
  dogImage.innerHTML = changeImage(description);
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = description;
  feelsLikeElement.innerHTML = `${Math.round(feelsLike)}°C`;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${Math.round(wind)} km/h`;
  pressureElement.innerHTML = `${pressure} hPa`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function changeIcon(description) {
  let icon = "cloud"; //default
  let image =
    "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/347/original/Lluvia.gif?1759348555";
  if (description.includes("rain")) {
    icon = "umbrella";
    image =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/347/original/Lluvia.gif?1759348555";
  } else if (description == "snow") {
    icon = "ac_Unit";
    image =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/345/original/Nieve.gif?1759348526";
  } else if (description.includes("clouds")) {
    icon = "cloud";
    image =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/348/original/Nublado.gif?1759348577";
  } else if (description == "clear sky") {
    icon = "wb_sunny";
    image =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/349/original/Soleado.gif?1759348591";
  } else if (description == "thunderstorm") {
    icon = "thunderstorm";
    image =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/346/original/Tormenta.gif?1759348542";
  } else if (description == "few clouds") {
    image =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/344/original/ParcialmenteNublado.gif?1759348497";
  }

  return `<span class="material-icons">${icon}</span>`;
}

function changeImage(description) {
  let image =
    "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/347/original/Lluvia.gif?1759348555";
  if (description.includes("rain")) {
    image =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/347/original/Lluvia.gif?1759348555";
  } else if (description == "snow") {
    image =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/345/original/Nieve.gif?1759348526";
  } else if (description.includes("clouds")) {
    image =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/348/original/Nublado.gif?1759348577";
  } else if (description == "clear sky") {
    image =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/349/original/Soleado.gif?1759348591";
  } else if (description == "thunderstorm") {
    image =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/346/original/Tormenta.gif?1759348542";
  } else if (description == "few clouds") {
    image =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/174/344/original/ParcialmenteNublado.gif?1759348497";
  }

  return `<img src=${image} alt="illustration of a dog enjoying the weather from the window"/>`;
}

function getCityInfo(city) {
  let apiKey = "97fab40oeb1c82af2b7390d7e00fac2t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchForCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  getCityInfo(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchForCity);

getCityInfo("Berlin");
