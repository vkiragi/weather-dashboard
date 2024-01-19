// Function to fetch weather data
function fetchWeatherData() {
  const apiKey = "53e705abc240c2fddf86f0438b29faf3"; // Your API key (Keep it secret)
  const city = "Sunnyvale";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      updateWeatherUI(data);
    })
    .catch((error) => {
      console.error("Error fetching the weather data: ", error);
    });
}

// Function to update the UI with fetched weather data
function updateWeatherUI(data) {
  // Make sure to update the selectors if you have different IDs or class names in your HTML
  const temperatureElement = document.getElementById("temperature");
  const locationElement = document.getElementById("location");
  const dateTimeElement = document.getElementById("date-time");

  // Update the temperature, location, and date-time based on the fetched data
  temperatureElement.textContent = `${data.main.temp.toFixed(1)}°C`;
  locationElement.textContent = `${data.name}, ${data.sys.country}`;
  dateTimeElement.textContent = `Last updated: ${new Date().toLocaleString(
    "en-US",
    { timeZone: data.timezone }
  )}`;

  // Update additional details
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("sunset").textContent = new Date(
    data.sys.sunset * 1000
  ).toLocaleTimeString("en-US");
  document.getElementById("sunrise").textContent = new Date(
    data.sys.sunrise * 1000
  ).toLocaleTimeString("en-US");
  document.getElementById("uv-index").textContent = "N/A"; // The OpenWeatherMap API does not provide UV index in the free tier
}

// Call the function to fetch weather data when the script loads
fetchWeatherData();
