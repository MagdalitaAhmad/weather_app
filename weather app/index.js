const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card")
const apiKey = "b089b2caf5f9812636286ec6a89fb2e9";


weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getweatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Please enter a city");
    }
});

async function getweatherData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response  = await fetch(apiURL);

    if (!response.ok) {
        throw new Error("Could Not Fetch Weather Data")
    }

    return await response.json();
}


function displayWeatherInfo(data) {
    console.log(data);

    const { name : city, 
            main :{temp, humidity}, 
            weather: [{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex";
    const cityDisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");


    cityDisplay.textContent = city;
    tempdisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = `${(description).toUpperCase()}`;
    emojiDisplay.textContent = getweatherEmoji(id);


    cityDisplay.classList.add("cityDisplay");
    tempdisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    emojiDisplay.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay)
};

function getweatherEmoji(weatherID) {
    switch (true) {
        case (weatherID >= 200 && weatherID < 300):
            return "⛈️";
        case (weatherID >= 300 && weatherID < 500):
            return "🌧️";   
        case (weatherID >= 500 && weatherID < 600):
            return "🌧️";   
        case (weatherID >= 600 && weatherID < 700):
            return "❄️";   
        case (weatherID === 800):
            return "☀️"; 
        case (weatherID > 800 && weatherID < 810):
                return "☁️"; 
        default:
            return "Unknown Weather";

    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

