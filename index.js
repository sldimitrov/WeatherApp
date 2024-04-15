const apiKey = "539d9b287b9b99eee7e12081aa43f3a8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".search-bar-container input");
const searchBtn = document.querySelector(".search-bar-container button");
const weatherIcon = document.getElementById("cloud-img")
const miniIcon = document.querySelector(".weather-img")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);
    console.log(data.name);

    document.getElementById("city").innerHTML = data.name;
    document.querySelector(".current-temperature").innerHTML = Math.round(data.main.temp) + "°";

    const myUnixTimestamp = data.dt; // start with a Unix timestamp
    const myDate = new Date(myUnixTimestamp * 1000).toUTCString(); // convert timestamp to milliseconds and construct Date object

    document.getElementById("date").innerHTML = myDate;
    document.getElementById("forecast-heading").innerHTML = data.weather[0].description;

    document.getElementById("temp-max").innerHTML = Math.round(data.main.temp_max) + "°c";
    document.getElementById("temp-min").innerHTML = Math.round(data.main.temp_min) + "°c";
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("cloudy").innerHTML = data.clouds.all + "%";
    document.getElementById("wind").innerHTML = data.wind.speed + " km/h";

    document.getElementById("weather-description").innerHTML = data.weather[0].description;
    document.querySelector(".forecast-temp").innerHTML = Math.round(data.main.temp) + "°c";

    const mapper = new Map([
        ["Clouds", "images/clouds.png"],
        ["Clear", "images/clear.png"],
        ["Rain", "images/rain.png"],
        ["Drizzle", "images/drizzle.png"],
        ["Mist", "images/mist.png"],
      ]);

      data = data.weather[0].main;

      icon = mapper.get(data)

      weatherIcon.src = icon;
      miniIcon.src = icon;
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

checkWeather();