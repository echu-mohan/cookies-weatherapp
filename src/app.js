const form = document.querySelector("#search-form");
let cityName = document.querySelector("#search-name");
let heading = document.querySelector(".city-name");

console.log(cityName.value);

function submitForm(event) {
  event.preventDefault();
  if (cityName.value) {
    if (cityName.value.length <= 1) {
      alert("Please enter a proper name of a place");
      cityName.value = "";
    } else {
      heading.innerHTML = cityName.value;
      cityName.value = "";
    }
  } else {
    alert("Please enter a proper name of a place");
  }
}
form.addEventListener("submit", submitForm);
