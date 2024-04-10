const apiKey = "539d9b287b9b99eee7e12081aa43f3a8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".search-bar-container input");
const searchBtn = document.querySelector(".search-bar-container button");
const weatherIcon = document.getElementById("weather-img")
console.log(weatherIcon)

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.getElementById("city").innerHTML = data.name;
    document.querySelector(".current-temperature").innerHTML = Math.round(data.main.temp) + "°";

    const myUnixTimestamp = data.dt; // start with a Unix timestamp
    const myDate = new Date(myUnixTimestamp * 1000); // convert timestamp to milliseconds and construct Date object
    document.getElementById("date").innerHTML = myDate;
    
    document.getElementById("forecast-heading").innerHTML = data.weather[0].description;

    document.getElementById("temp-max").innerHTML = Math.round(data.main.temp_max) + "°c";
    document.getElementById("temp-min").innerHTML = Math.round(data.main.temp_min) + "°c";
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("cloudy").innerHTML = data.clouds.all + "%";
    document.getElementById("wind").innerHTML = data.wind.speed + " km/h";

    document.getElementById("weather-description").innerHTML = data.weather[0].description;
    document.querySelector(".forecast-temp").innerHTML = Math.round(data.main.temp) + "°c";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src="images/clouds.png";
        mainIcon.src="images/clouds.png";
    }
    else if (data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
        mainIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png"
        mainIcon.src = "images/rain.png"
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src ="images/drizzle.png";
        mainIcon.src ="images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
        mainIcon.src = "images/mist.png";
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

checkWeather();