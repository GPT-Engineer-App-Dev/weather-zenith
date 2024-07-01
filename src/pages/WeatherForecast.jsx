import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fetchWeather = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

const fetchForecast = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=YOUR_API_KEY`);
  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }
  return response.json();
};

function WeatherForecast() {
  const [city, setCity] = useState("New York");
  const { data: weatherData, error: weatherError, isLoading: weatherLoading } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
  });
  const { data: forecastData, error: forecastError, isLoading: forecastLoading } = useQuery({
    queryKey: ["forecast", city],
    queryFn: () => fetchForecast(city),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Refetch weather and forecast data
  };

  return (
    <div>
      <h1 className="text-3xl text-center">Weather Forecast</h1>
      <form onSubmit={handleSearch} className="flex justify-center mt-4">
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="mr-2"
        />
        <Button type="submit">Search</Button>
      </form>
      {weatherLoading && <p>Loading current weather...</p>}
      {weatherError && <p>Error fetching current weather: {weatherError.message}</p>}
      {weatherData && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Current Weather in {weatherData.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>Description: {weatherData.weather[0].description}</p>
          </CardContent>
        </Card>
      )}
      {forecastLoading && <p>Loading 7-day forecast...</p>}
      {forecastError && <p>Error fetching 7-day forecast: {forecastError.message}</p>}
      {forecastData && (
        <div className="mt-4">
          <h2 className="text-2xl text-center">7-Day Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {forecastData.list.map((day, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>Day {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>High: {day.temp.max}°C</p>
                  <p>Low: {day.temp.min}°C</p>
                  <p>Description: {day.weather[0].description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherForecast;