function displayWeatherData(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
}

let apiKey = "e233dfo65c6ete669b0c1463eb14aaf0";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=Paris&key=${apiKey}&units=metric`;

axios.get(apiURL).then(displayWeatherData);