var searchBtn = document.querySelector("#searchButton");
var apiKey = "cd2188794e9c4a18688851ec2409ea64";
// var mainUrl =
//   "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}";
// var longLatUrl =
//   "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";

// var baseUrl = "https://api.openweathermap.org/data/2.5/";

async function fetchWeather() {
  var search = document.querySelector("#cityInput").value;
  const responseLatLon = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${apiKey}`
  );

  //const response = await fetch(`${baseUrl}weather?q=${search}&appid=${apiKey}`);
  const dataLatLon = await responseLatLon.json();
  var lat = dataLatLon[0].lat;
  var longitude = dataLatLon[0].lon;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${longitude}&appid=${apiKey}`
  );
  const data = await response.json();

  document.querySelector("#weatherCurrentCityName").textContent =
    data.city.name + " " + new Date(data.list[0].dt_txt).toLocaleDateString();

  console.log(data);
}

searchBtn.addEventListener("click", fetchWeather);

//fetchCoords();
