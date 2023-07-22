const API_KEY = "54cc2c3c1c47158ce4f5bb07adfc67e6";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const form = document.querySelector("form");
const searchBox = document.querySelector(".searchBox input");
const weatherIcon = document.querySelector(".weatherIcon");
const invalidCityName = document.querySelector(".error");

async function checkWeater ( city ) {
    const response = await fetch( API_URL + city + `&appid=${API_KEY}`);
    let data = await response.json();

    console.log(data);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
        if (data.weather[0].main == "Clouds") weatherIcon.src = "animatedImages/cloudy.svg";
        else if (data.weather[0].main == "Clear")  weatherIcon.src = "animatedImages/clear-day.svg";
        else if (data.weather[0].main == "Rain")  weatherIcon.src = "animatedImages/rain.svg";
        else if (data.weather[0].main == "Drizzle")  weatherIcon.src = "animatedImages/drizzle.svg";
        else if (data.weather[0].main == "Mist")  weatherIcon.src = "animatedImages/mist.svg";
        else if (data.weather[0].main == "Thunderstorm")  weatherIcon.src = "animatedImages/thunderstorms.svg";
        else if (data.weather[0].main == "Snow")  weatherIcon.src = "animatedImages/snow.svg";

       
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }

}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkWeater(searchBox.value);
});

