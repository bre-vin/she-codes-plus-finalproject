function updateTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let weatherIconElement = document.querySelector("#weather-icon");

  temperatureElement.innerHTML = temperature;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  weatherIconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

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

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityInput = searchInputElement.value;
  let apiKey = `dfc8abb9a745462f6o46f358det48310`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemperature);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let abbrDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return abbrDays[date.getDay()];
}

function getForecastData(city) {
  let apiKey = `dfc8abb9a745462f6o46f358det48310`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML += `
    <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <div class="weather-forecast-icon">
        <img src="${day.condition.icon_url}" />
      </div>
      <div class="weather-forecast-temperature">
        <div class="weather-forecast-max"><strong>${Math.round(
          day.temperature.maximum
        )}°</strong></div>
        <div class="weather-forecast-min">${Math.round(
          day.temperature.minimum
        )}°</div>
      </div>
    </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
