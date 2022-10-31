import "./App.css";
import CurrentWeather from "./Components/current-weather/current-weather";
import Search from "./Components/Search/Search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
import Forecast from "./Components/forecast/forecast";


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentForecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [latitude, longitude] =searchData.value.split(" ")

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
   
  };
  console.log(currentWeather );
  console.log(currentForecast);
  

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {currentForecast && <Forecast data={currentForecast}/> }
     
    </div>
  );
}

export default App;
