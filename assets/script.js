var searchBtn = document.querySelector("#searchButton");
var apiKey = "cd2188794e9c4a18688851ec2409ea64";

async function fetchWeather() {
  var search = document.querySelector("#cityInput").value;
  if (search === "") {
    search = "London";
    var localHistory = localStorage.getItem("localHistory");
    if (localHistory === "" || localHistory === null) {
      localStorage.setItem("localHistory", JSON.stringify([]));
      var localHistoryList = JSON.parse(localStorage.getItem("localHistory"));
      localHistoryList.push(search);
      if (localHistoryList.length > 7) localHistoryList.shift();
      localStorage.setItem("localHistory", JSON.stringify(localHistoryList));
    }
    var localHistoryList = JSON.parse(localStorage.getItem("localHistory"));
    var buttonContainer = document.querySelector("#buttonContainer");
    while (buttonContainer.firstChild) {
      buttonContainer.removeChild(buttonContainer.firstChild);
    }

    for (var i = localHistoryList.length - 1; i >= 0; i--) {
      var buttonContainerDiv = document.createElement("div");
      buttonContainerDiv.classList.add("d-grid", "gap-2", "mb-3");

      var buttonElement = document.createElement("button");
      buttonElement.classList.add(
        "btn",
        "btn-secondary",
        "py-3",
        "history-button"
      );

      buttonElement.textContent = localHistoryList[i];

      buttonElement.setAttribute("data-search", localHistoryList[i]);
      buttonElement.addEventListener("click", setInputFunction);
      buttonContainerDiv.appendChild(buttonElement);

      buttonContainer.appendChild(buttonContainerDiv);
    }
  } else {
    var localHistory = localStorage.getItem("localHistory");
    if (localHistory === "" || localHistory === null) {
      localStorage.setItem("localHistory", JSON.stringify([]));
    }
    var localHistoryList = JSON.parse(localStorage.getItem("localHistory"));
    localHistoryList.push(search);
    if (localHistoryList.length > 7) localHistoryList.shift();
    localStorage.setItem("localHistory", JSON.stringify(localHistoryList));

    var buttonContainer = document.querySelector("#buttonContainer");
    while (buttonContainer.firstChild) {
      buttonContainer.removeChild(buttonContainer.firstChild);
    }
    for (var i = localHistoryList.length - 1; i >= 0; i--) {
      var buttonContainerDiv = document.createElement("div");
      buttonContainerDiv.classList.add("d-grid", "gap-2", "mb-3");

      var buttonElement = document.createElement("button");
      buttonElement.classList.add(
        "btn",
        "btn-secondary",
        "py-3",
        "history-button"
      );

      buttonElement.textContent = localHistoryList[i];

      buttonElement.setAttribute("data-search", localHistoryList[i]);
      buttonElement.addEventListener("click", setInputFunction);
      buttonContainerDiv.appendChild(buttonElement);

      buttonContainer.appendChild(buttonContainerDiv);
    }
  }
  const responseLatLon = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${apiKey}`
  );

  const dataLatLon = await responseLatLon.json();
  var lat = dataLatLon[0].lat;
  var longitude = dataLatLon[0].lon;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${longitude}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();

  document.querySelector("#weatherContainer div h1").textContent =
    data.city.name + " " + new Date(data.list[0].dt_txt).toLocaleDateString();

  document.querySelector("#first-h6").textContent =
    "Temp: " + data.list[0].main.temp;
  var mainImg = new Image();
  mainImg.src =
    "https://openweathermap.org/img/wn/" +
    data.list[0].weather[0].icon +
    "@2x.png";
  document.querySelector("#first-h6").appendChild(mainImg);
  document.querySelector("#second-h6").textContent =
    "Wind: " + data.list[0].wind.speed;

  document.querySelector("#third-h6").textContent =
    "Humidity: " + data.list[0].main.humidity + "%";

  console.log(data);

  var divContainer = document.querySelector("#weatherContainerInner");
  while (divContainer.firstChild) {
    divContainer.removeChild(divContainer.firstChild);
  }

  for (var i = 1; i <= 5; i++) {
    var divElementOuter = document.createElement("div");
    divElementOuter.classList.add("col");

    var divElementInner = document.createElement("div");
    divElementInner.classList.add("bg-black", "text-white", "me-2", "p-2");

    divElementOuter.appendChild(divElementInner);

    var headingElement = document.createElement("h5");
    var headingElementText = document.createTextNode(
      new Date(data.list[i * 8 - 1].dt_txt).toLocaleDateString()
    );
    headingElement.appendChild(headingElementText);
    divElementInner.appendChild(headingElement);

    var pElementOne = document.createElement("p");
    var pElementOneText = document.createTextNode(
      "Temp: " + data.list[i * 8 - 1].main.temp
    );
    pElementOne.appendChild(pElementOneText);

    var img = new Image();
    img.src =
      "https://openweathermap.org/img/wn/" +
      data.list[i * 8 - 1].weather[0].icon +
      "@2x.png";
    pElementOne.appendChild(img);
    divElementInner.appendChild(pElementOne);

    var pElementTwo = document.createElement("p");
    var pElementTwoText = document.createTextNode(
      "Wind: " + data.list[i * 8 - 1].wind.speed
    );
    pElementTwo.appendChild(pElementTwoText);
    divElementInner.appendChild(pElementTwo);

    var pElementThree = document.createElement("p");
    var pElementThreeText = document.createTextNode(
      "Humidity: " + data.list[i * 8 - 1].main.humidity + "%"
    );
    pElementThree.appendChild(pElementThreeText);
    divElementInner.appendChild(pElementThree);

    divContainer.appendChild(divElementOuter);
  }
}

searchBtn.addEventListener("click", fetchWeather);
searchBtn.addEventListener("click", fetchWeather);

fetchWeather();
function setInputFunction(e) {
  document.querySelector("#cityInput").value =
    e.target.getAttribute("data-search");
  fetchWeather();
}
