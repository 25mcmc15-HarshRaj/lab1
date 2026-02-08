// Interface for weather data
interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
    }[];
}

// Function to get weather
function getWeather(): void {
    const cityInput = document.getElementById("cityInput") as HTMLInputElement | null;
    const resultDiv = document.getElementById("result") as HTMLDivElement | null;

    if (!cityInput || !resultDiv) return;

    const city: string = cityInput.value;

    if (city === "") {
        resultDiv.innerHTML = "Please enter a city name";
        return;
    }

    // 🔴 ADD YOUR API KEY HERE
    const apiKey: string = "fccd78e1e14bcb9d9c19f47713954b13";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then((data: any) => {

            if (data.cod === "404") {
                resultDiv.innerHTML = "City not found!";
                return;
            }

            const weatherData = data as WeatherData;

            resultDiv.innerHTML = `
                <h3>${weatherData.name}</h3>
                <p>Temperature: ${weatherData.main.temp} °C</p>
                <p>Humidity: ${weatherData.main.humidity}%</p>
                <p>Condition: ${weatherData.weather[0]?.description}</p>
            `;
        })
        .catch(() => {
            resultDiv.innerHTML = "Network error. Please try again.";
        });
    }
