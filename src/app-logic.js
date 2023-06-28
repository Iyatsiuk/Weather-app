function formatDate(timestamp) {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherData(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let tempElement = document.querySelector("#temp");
  celsiusTemp = response.data.temperature.current;
  tempElement.innerHTML = Math.round(celsiusTemp);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon )
}

function search(city) {
  let apiKey = "e233dfo65c6ete669b0c1463eb14aaf0";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeatherData);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function convertingToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  //remove tha active class from the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function convertingToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusTemp = null;

let form = document.querySelector("#weather-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertingToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertingToCelsius);

search("Ternopil");