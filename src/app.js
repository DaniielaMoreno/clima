function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#searched-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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
