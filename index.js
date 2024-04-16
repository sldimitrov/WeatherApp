//   Initialise variables
// For the API connection
const apiKey = "539d9b287b9b99eee7e12081aa43f3a8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
// Store the data from the input
const searchBox = document.querySelector(".search-bar-container input");
// Initialise variables for the buttons
const searchBtn = document.getElementById("search-button");
const historyBtn = document.getElementById("history-button");
const removeHistoryBtn = document.getElementById("exit-img");
// And for the two icons that change 
const weatherIcon = document.getElementById("cloud-img")
const miniIcon = document.querySelector(".weather-img")

// Add event listeners to the history buttons
historyBtn.addEventListener('click', showHistory);
removeHistoryBtn.addEventListener('click', removeHistory);

async function showHistory(){
    /* This function should SHOW a slide bar that appears from the left of the page */
    document.querySelector('.sidebar-container').classList.add('active');
    document.querySelector('.sidebar-background-container').classList.add('active');
}


async function removeHistory(){
    /* This function should REMOVE slide bar that appears from the left */
    document.querySelector('.sidebar-container').classList.remove('active');
    document.querySelector('.sidebar-background-container').classList.remove('active');
}

// Функция за създаване на нов контейнер
async function createContainer(city) {
    const newContainer = document.createElement('div');
    const parentContainer = document.querySelector(".history-container");
    const children = parentContainer.getElementsByClassName(".browsed-city");
    console.log(children)

    // Въртене през децата на контейнера
    for (let i = 0; i < children.length; i++) {
        console.log(child);
        const child = children[i];
        console.log(content)
        const content = child.textContent;

        // Проверка дали детето съдържа определена стойност
        if (content.includes("Banana")) {
            console.log(`Намерено: ${content}`);
        }
    }

    const eventButton = document.createElement("button");
    eventButton.textContent = "Restore";
    // SHOULD CLOSE THE TAB AND RESTORE THE DATA
    eventButton.addEventListener("click", function() {
        removeHistory()
        checkWeather(city)
    });

    eventButton.id 
    newContainer.classList.add('browsed-city'); // Добавете клас или стилове според нуждите си
    newContainer.innerHTML = `<p>${city}</p>`; // Вмъкнете съдържание в параграф
    newContainer.appendChild(eventButton)
    newContainer.addEventListener("click", removeHistory())


    parentContainer.appendChild(newContainer); // Добавете новия контейнер към родителския контейнер
}

async function checkWeather(city){
    /* 
    The main purpose of this function is to requrest the data from the weather RESTapi */

    // Fetch the api and get the returned data
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    // Extract the needed data from the source
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

    // Convert the data into Date object
    const myUnixTimestamp = data.dt; // start with a Unix timestamp
    const myDate = new Date(myUnixTimestamp * 1000).toUTCString(); // convert timestamp to milliseconds

    // Spill the data into each HTML element
    document.getElementById("city").innerHTML = city;
    document.querySelector(".current-temperature").innerHTML = currentTemperature;

    document.getElementById("date").innerHTML = myDate;
    document.getElementById("forecast-heading").innerHTML = forecastHeading;

    document.getElementById("temp-max").innerHTML = tempMax;
    document.getElementById("temp-min").innerHTML = tempMin;
    document.getElementById("humidity").innerHTML = humidity;
    document.getElementById("cloudy").innerHTML = clouds;
    document.getElementById("wind").innerHTML = wind;

    document.getElementById("weather-description").innerHTML = weatherDescription;
    document.querySelector(".forecast-temp").innerHTML = forecastTemp;

    // Initialise a mapper in order to optimize the change of the icons
    const mapper = new Map([
        ["Clouds", "images/clouds.png"],
        ["Clear", "images/clear.png"],
        ["Rain", "images/rain.png"],
        ["Drizzle", "images/drizzle.png"],
        ["Mist", "images/mist.png"],
      ]);
    // Get the forecast heading 
    forecastData = data.weather[0].main;
    // and the icon that is suitable for the current weather
    icon = mapper.get(forecastData)
    // Then, finally, change the icons
    weatherIcon.src = icon;
    miniIcon.src = icon;

    // Call the funciton
    createContainer(city);
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})