const API_KEY = "54cc2c3c1c47158ce4f5bb07adfc67e6";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const form = document.querySelector("form");
const searchBox = document.querySelector(".searchBox input");
const weatherIcon = document.querySelector(".weatherIcon");
const invalidCityName = document.querySelector(".error");

async function checkWeater ( city ) {
    const response = await fetch( API_URL + city + `&appid=${API_KEY}`);
    let data = await response.json();

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
        if (data.weather[0].main == "Clouds") weatherIcon.src = "images/clouds.png";
        else if (data.weather[0].main == "Clear")  weatherIcon.src = "images/clear.png"
        else if (data.weather[0].main == "Rain")  weatherIcon.src = "images/rain.png"
        else if (data.weather[0].main == "Drizzle")  weatherIcon.src = "images/drizzle.png"
        else if (data.weather[0].main == "Mist")  weatherIcon.src = "images/mist.png"
       
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }

}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkWeater(searchBox.value);
});

