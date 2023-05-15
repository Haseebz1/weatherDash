var cityInput = document.querySelector('#cityInput')
var searchBtn = document.querySelector('#searchButton')
var apiKey = 'cd2188794e9c4a18688851ec2409ea64'
var baseUrl = 'https://api.openweathermap.org/data/2.5/'

async function fetchCoords(search){
    const response = await fetch(`${baseUrl}weather?q=${search}&appid=${apiKey}`)
    const data = await response.json()
    console.log(data)
}

searchBtn.addEventListener('click', fetchCoords)

var testCity = 'Birmingham'

fetchCoords('London')