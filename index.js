let weatherDiv = document.getElementById("weather-info");

let currentLocation = navigator.geolocation.watchPosition((position) => {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  const key = "a59e2100e3adb85cfe1124b32cbbe4b9";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => render(data))
    .catch((err) => console.log(err));
});

function gettime() {
  const date = new Date();
  document.getElementById("time-wrapper").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}

function render(data) {
  console.log(data);
  weatherDiv.innerHTML = `
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
      <div>
      <h2>${data.name}</h2>
      <p class="current-temp">${data.main.temp.toFixed(1)}&degC</p>
      <p class="current-feel">Feel : ${data.main.feels_like.toFixed(1)}&degC</p>
      </div>
      <div>
      <p class="high-low">${data.main.temp_max.toFixed(
        1
      )}&degC / ${data.main.temp_min.toFixed(1)}&deg</p>
        </div>
        `;
}

setInterval(gettime, 1000);
