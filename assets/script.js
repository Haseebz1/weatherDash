var searchBtn = document.querySelector("#searchButton");
var apiKey = "cd2188794e9c4a18688851ec2409ea64";




async function fetchWeather() {
  var search = document.querySelector("#cityInput").value;
  if (search === "") {
    search = "London";
    var localHistory = localStorage.getItem("localHistory");
    if (localHistory === "" || localHistory === null) {
      localStorage.setItem("localHistory", JSON.stringify([]))
      var localHistoryList = JSON.parse(localStorage.getItem("localHistory"));
      localHistoryList.push(search);
      if(localHistoryList.length > 7)
      localHistoryList.shift();
      localStorage.setItem("localHistory", JSON.stringify(localHistoryList));
    }
    var localHistoryList = JSON.parse(localStorage.getItem("localHistory"));
    var buttonContainer = document.querySelector("#buttonContainer");
    while (buttonContainer.firstChild) {
      buttonContainer.removeChild(buttonContainer.firstChild);
    }
    


searchBtn.addEventListener("click", fetchWeather);

//fetchCoords();
