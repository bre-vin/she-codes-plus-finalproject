function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityInput = searchInputElement.value;
  let apiKey = `dfc8abb9a745462f6o46f358det48310`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemperature);
}

function getForecastData(city) {
  let apiKey = `dfc8abb9a745462f6o46f358det48310`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function updateTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let currentCity = document.querySelector("#current-city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let weatherIconElement = document.querySelector("#weather-icon");

  weatherIconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
  temperatureElement.innerHTML = Math.round(temperature);
  currentCity.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  getForecastData(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function displayForecast() {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forcastHTML = "";

  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `
    <div class="weather-forecast-day">
      <div class="weather-forecast-date">${day}</div>
      <div class="weather-forecast-icon"></div>
      <div class="weather-forecast-temperature">
        <div class="weather-forecast-temperature-max"><strong>18°</strong></div>
        <div class="weather-forecast-temperature-min">12°</div>
      </div>
    </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forcastHTML;
}
