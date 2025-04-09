import { useState, useEffect } from "react";
import axios from "axios";
import { Weather } from "../types/weather";

const OPENWEATHER_KEY = process.env.REACT_APP_OPENWEATHER_KEY;

export const useWeather = (lat: number, lon: number) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip fetch if coordinates are invalid (0, 0)
    if (lat === 0 || lon === 0) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}&units=imperial`
        );
        setWeather({
          temp: response.data.main.temp,
          windSpeed: response.data.wind.speed,
          description: response.data.weather[0].description,
        });
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError("Failed to fetch weather.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return { weather, loading, error };
};