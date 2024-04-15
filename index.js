const apiKey = "539d9b287b9b99eee7e12081aa43f3a8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".search-bar-container input");
const searchBtn = document.getElementById("search-button");
const historyBtn = document.getElementById("history-button")
const weatherIcon = document.getElementById("cloud-img")
const miniIcon = document.querySelector(".weather-img")

historyBtn.addEventListener('click', showHistory)

async function showHistory(){
    /* This function should show a slide bar that appears from the left of the page */
    document.querySelector('.sidebar-container').classList.toggle('active');
} 


async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    var city = data.name;
    var currentTemperature = Math.round(data.main.temp) + "°";
    var forecastHeading = data.weather[0].description;
    var tempMax = Math.round(data.main.temp_max) + "°c";
    var tempMin = Math.round(data.main.temp_min) + "°c";
    var humidity = data.main.humidity + "%";
    var clouds = data.clouds.all + "%";
    var wind = data.wind.speed + " km/h";
    
    var weatherDescription = data.weather[0].description;
    var forecastTemp = Math.round(data.main.temp) + "°c";

    document.getElementById("city").innerHTML = city;
    document.querySelector(".current-temperature").innerHTML = currentTemperature;

    const myUnixTimestamp = data.dt; // start with a Unix timestamp
    const myDate = new Date(myUnixTimestamp * 1000).toUTCString(); // convert timestamp to milliseconds and construct Date object

    document.getElementById("date").innerHTML = myDate;
    document.getElementById("forecast-heading").innerHTML = forecastHeading;

    document.getElementById("temp-max").innerHTML = tempMax;
    document.getElementById("temp-min").innerHTML = tempMin;
    document.getElementById("humidity").innerHTML = humidity;
    document.getElementById("cloudy").innerHTML = clouds;
    document.getElementById("wind").innerHTML = wind;

    document.getElementById("weather-description").innerHTML = weatherDescription;
    document.querySelector(".forecast-temp").innerHTML = forecastTemp;

    const mapper = new Map([
        ["Clouds", "images/clouds.png"],
        ["Clear", "images/clear.png"],
        ["Rain", "images/rain.png"],
        ["Drizzle", "images/drizzle.png"],
        ["Mist", "images/mist.png"],
      ]);

    forecastData = data.weather[0].main;

    icon = mapper.get(forecastData)

    weatherIcon.src = icon;
    miniIcon.src = icon;

    // After visualisation we will need to store the 
    // searched data into the session storage
    
    sessionStorage.setItem('city', JSON.stringify({'name': city}));
    // Check the saved data into the sessionStorage 
    // console.log(sessionStorage);
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

checkWeather();