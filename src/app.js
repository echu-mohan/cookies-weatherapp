const form = document.querySelector("#search-form");
let cityName = document.querySelector("#search-name");
let heading = document.querySelector(".city-name");
const curDay = document.querySelector(".current-day");
const curTime = document.querySelector(".current-time");
const curDescription = document.querySelector("#description");
const curHumidity = document.querySelector(".city-humidity");
const curWind = document.querySelector(".city-wind");
const curIcon = document.querySelector("#smiley");

const now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

function setDayandTime(days) {
  let newTemp;
  curDay.innerHTML = day;
  if (now.getMinutes() <= 9) {
    newTemp = `0${now.getMinutes()}`;
  } else {
    newTemp = now.getMinutes();
  }
  curTime.innerHTML = `${now.getHours()}:${newTemp}`;
}
function setIcon(response) {
  let icon = `<img
              class="text-large"
              src="${response.data.condition.icon_url}"
              alt=""
            />`;
  curIcon.innerHTML = icon;
}
function setDescription(response) {
  curDescription.innerHTML = response.data.condition.description;
}
function setHumidityandWind(response) {
  curHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  curWind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
}
function displayTemperature(response) {
  console.log(response);
  let temp = document.querySelector(".city-temp");
  let temperature = response.data.temperature.current;
  temp.innerHTML = `${Math.round(temperature)}°C`;
  setDescription(response);
  setHumidityandWind(response);
  setIcon(response);
}
function getForecastData(city) {
  let apiKey = "903fa0e63e42bda3e0tecffc708cobc2";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log("hellooooo");
  return axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  const forescast = document.querySelector("#forecast");
  let forecastHTML = "";
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="day">
            <div class="week">${day}</div>
            <div class="forecast-icon"><img src="" alt="" /></div>
            <div class="weather-forecast-temperatures">
              <span class="high-temp text-dark-green">12° </span
              ><span class="low-temp text-light-green">8°</span>
            </div>
          </div>`;
    forescast.innerHTML = forecastHTML;
  });
}
function searchCity(city) {
  heading.innerHTML = city;
  let apiKey = "903fa0e63e42bda3e0tecffc708cobc2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  return axios.get(apiUrl).then(displayTemperature);
}

function submitForm(event) {
  event.preventDefault();
  if (cityName.value) {
    if (cityName.value.length <= 1) {
      alert("Please enter a proper name of a place");
      cityName.value = "";
    } else {
      searchCity(cityName.value);
      getForecastData(cityName.value);
      cityName.value = "";
    }
  } else {
    alert("Please enter a proper name of a place");
  }
}

form.addEventListener("submit", submitForm);

setDayandTime(day);
searchCity("Geneva").then(() => {
  document.getElementsByClassName("city-weather")[0].style.visibility =
    "visible";
});
getForecastData("Geneva").then(() => {});
