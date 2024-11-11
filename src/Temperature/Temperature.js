import React, { useState, useEffect } from "react";
import "./Temperature.scss";

const WeatherWidget = () => {
  const [city, setCity] = useState("");
  const [temperatureC, setTemperatureC] = useState(null);
  const [temperatureF, setTemperatureF] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      () => setError("Location denied")
    );
  }, []);

  const fetchWeather = async (lat, lon) => {
    const apiKey = "b9d133e9e87805090def0a5a074985cf";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Weather data fetch failed");
      }
      const data = await response.json();
      setCity(data.name);
      const tempC = Math.round(data.main.temp);
      setTemperatureC(tempC);
      setTemperatureF(Math.round(tempC * 9/5 + 32));
    } catch (error) {
      setError("Error fetching weather data");
      console.error("Fetch error:", error.message);
    }
  };

  return (
    <div className="widget">
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2 className="city">{city}</h2>
          <p className="temperature">
            {temperatureC}°C <span>/</span> {temperatureF}°F
          </p>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
