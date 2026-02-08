// Function to get weather
function getWeather() {
    var cityInput = document.getElementById("cityInput");
    var resultDiv = document.getElementById("result");
    if (!cityInput || !resultDiv)
        return;
    var city = cityInput.value;
    if (city === "") {
        resultDiv.innerHTML = "Please enter a city name";
        return;
    }
    // 🔴 ADD YOUR API KEY HERE
    var apiKey = "fccd78e1e14bcb9d9c19f47713954b13";
    fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&units=metric&appid=").concat(apiKey))
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var _a;
        if (data.cod === "404") {
            resultDiv.innerHTML = "City not found!";
            return;
        }
        var weatherData = data;
        resultDiv.innerHTML = "\n                <h3>".concat(weatherData.name, "</h3>\n                <p>Temperature: ").concat(weatherData.main.temp, " \u00B0C</p>\n                <p>Humidity: ").concat(weatherData.main.humidity, "%</p>\n                <p>Condition: ").concat((_a = weatherData.weather[0]) === null || _a === void 0 ? void 0 : _a.description, "</p>\n            ");
    })
        .catch(function () {
        resultDiv.innerHTML = "Network error. Please try again.";
    });
}
