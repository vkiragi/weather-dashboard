document.getElementById("search-btn").addEventListener("click", function () {
  const city = document.getElementById("search-input").value;
  fetchWeatherData(city);
});

async function fetchWeatherData(city) {
  const apiKey = "YOUR_API_KEY"; // Replace with your API key
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Weather data not found");
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
}

function displayWeatherData(data) {
  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = `
        <h2>${data.location.name}, ${data.location.region}</h2>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
        <!-- Add more data as needed -->
    `;
}
