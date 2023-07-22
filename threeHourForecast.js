const API_KEY = "54cc2c3c1c47158ce4f5bb07adfc67e6";
const API_URL = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const form = document.querySelector("form");
const searchBox = document.querySelector(".searchBox input");
const weatherIcon = document.querySelector(".weatherIcon");

const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };

async function getThreeHourForecast ( city ) {
    const response = await fetch( API_URL + city + `&appid=${API_KEY}`);
    let data = await response.json();

    console.log(data);

    if (response.status == 404) document.querySelector(".error").style.display = "block";
    else createWeatherCards (data.list);
}

async function createWeatherCards ( data ) {
    
    const weatherContainer = document.querySelector(".weather-cards");

    let currentDate = null;

    weatherContainer.innerHTML = "";

    data.forEach((forecast) => {
        const cardWeather = document.createElement("div");
        cardWeather.classList.add("cardWeather", "col-lg-3", "col-md-4", "col-sm-6");

         // Get the specific date (day and month)
        const date = new Date(forecast.dt * 1000);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "long" });

        if (currentDate !== `${day} ${month}`) {
            currentDate = `${day} ${month}`;
      
            const weatherDate = document.createElement("h2");
            weatherDate.classList.add("dateHeader");
            weatherDate.textContent = currentDate;
            weatherContainer.appendChild(weatherDate);
          }

        const time = document.createElement("p");
        time.textContent = new Date(forecast.dt * 1000).toLocaleTimeString([], timeOptions);
        cardWeather.appendChild(time);

        const temperature = document.createElement("p");
        temperature.classList.add("weather-info");
        temperature.textContent = Math.round(forecast.main.temp) + "°C";
        cardWeather.appendChild(temperature);

        const weatherEvent = document.createElement("p");
        weatherEvent.classList.add("weather-info");
        weatherEvent.textContent = forecast.weather[0].main;
        cardWeather.appendChild(weatherEvent);

        const weatherEventImg = document.createElement("img");
        weatherEventImg.classList.add("weatherEventImg", "img-fluid");
        if (forecast.weather[0].main == "Clouds") weatherEventImg.src = "animatedImages/cloudy.svg";
        else if (forecast.weather[0].main == "Clear")  weatherEventImg.src = "animatedImages/clear-day.svg";
        else if (forecast.weather[0].main == "Rain")  weatherEventImg.src = "animatedImages/rain.svg";
        else if (forecast.weather[0].main == "Drizzle")  weatherEventImg.src = "animatedImages/drizzle.svg";
        else if (forecast.weather[0].main == "Mist")  weatherEventImg.src = "animatedImages/mist.svg";
        else if (data.weather[0].main == "Thunderstorm")  weatherIcon.src = "animatedImages/thunderstorms.svg";
        else if (forecast.weather[0].main == "Snow")  weatherEventImg.src = "animatedImages/snow.svg";
        cardWeather.appendChild(weatherEventImg);

        const humidity = document.createElement("p");
        humidity.classList.add("weather-info");
        humidity.textContent = "Humidity: " + forecast.main.humidity + "%";
        cardWeather.appendChild(humidity);

        const windSpeed = document.createElement("p");
        windSpeed.classList.add("weather-info");
        windSpeed.textContent = "Wind speed: " + forecast.wind.speed + " km/h";
        cardWeather.appendChild(windSpeed);

        weatherContainer.appendChild(cardWeather);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    const city = document.querySelector(".searchText").value.trim();
    if (city) getThreeHourForecast(city);
}

form.addEventListener("submit", handleFormSubmit);
