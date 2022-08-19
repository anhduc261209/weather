const geocoderAPIKey = '213930595019253732127x91990';
const weatherAPIKey = 'd3c5dbe6ccmsh37d38169379cda7p1d66a8jsn4f5b8d97ed41';
const addressElem = document.getElementById('cityAddress');
const icon = document.getElementById('weather-icon');

function checkValid(address) {
    if (address == '') {
        addressElem.classList.add('is-invalid');
        return false;
    }
    addressElem.classList.remove('is-invalid');
    return true;
}

// get weather data from the API and display it
function displayWeather() {
    let address = addressElem.value;
    if (!checkValid(address)) return;
    document.getElementById('result-div').style.visibility = 'hidden';
    const weatherOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': weatherAPIKey,
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
    };
    let latitude, longitude;
    let weatherDescription, weatherIcon, temperature;
    
    address = address.replace(' ', '+');
    fetch(`https://geocode.xyz/${address}?json=1&auth=${geocoderAPIKey}`)
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error.description);
            return;
        }
        latitude = data.latt;
        longitude = data.longt;
        
        fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${longitude}&lat=${latitude}`, weatherOptions)
	    .then(response => response.json())
        .then(data => {
            weatherDescription = data.data[0].weather.description;
            weatherIcon = data.data[0].weather.icon;
            temperature = data.data[0].temp;
            document.getElementById('weather-text').innerHTML = `${temperature}°C\n${weatherDescription}`;
            icon.src = `https://www.weatherbit.io/static/img/icons/${weatherIcon}.png`;
            document.getElementById('result-div').style.visibility = 'visible';
        })
    })
}

window.onload = () => {
    document.getElementById('getBtn').addEventListener('click', displayWeather);
}