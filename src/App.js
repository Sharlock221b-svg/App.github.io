import React from "react";
import "./App.css";
import drizzle from "./images/drizzling24.webp";
import clear from "./images/clear.jpg";
import clouds from "./images/clouds.jpg";
import rain from "./images/rain.jpg";
import snow from "./images/snow.jpg";
import thunderstrom from "./images/thunderstrom.jpg";

function App() {
  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();
  const [md, setMD] = React.useState({});

  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    let crd = pos.coords;
    setLatitude(crd.latitude);
    setLongitude(crd.longitude);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
    const api =
      "https://weather-proxy.freecodecamp.rocks/api/current?lat=" +
      latitude +
      "&lon=" +
      longitude;
    fetch(api)
      .then((results) => results.json())
      .then((data) => {
        setMD({
          country: data.sys.country,
          name: data.name,
          temp: data.main.temp,
          weather: data.weather[0].main,
          wind: data.wind.speed,
          humid: data.main.humidity,
        });
      });
  },[latitude,longitude]);

  React.useEffect(() => {
    let word = md.weather;
    console.log("reached");
    console.log(word);
    switch (word) {
      case "Drizzle":
        document.body.style.cssText += `background-image:url(${drizzle})`;
        break;
      case "Clouds":
        document.body.style.cssText += `background-image:url(${clouds})`;
        break;
      case "Rain":
        document.body.style.cssText += `background-image:url(${rain})`;
        break;
      case "Snow":
        document.body.style.cssText += `background-image:url(${snow})`;
        break;
      case "Clear":
        document.body.style.cssText += `background-image:url(${clear})`;
        break;
      case "Thunderstrom":
        document.body.style.cssText += `background-image:url(${thunderstrom})`;
        break;
    }
  }, [md.weather]);

  return (
    <div className="App" id="app">
      <header>
        <h1>Weather App</h1>
      </header>
      <div className="cont">
        <h1>{md.temp} °C</h1>
        <h2>
          <span>{md.name} </span>
          {md.country}
        </h2>
        <div className="prop">
          <div id="spec">
            <span>Weather</span>
            <br></br>
            {md.weather}
          </div>
          <div id="spec">
            <span>Winds</span>
            <br></br>
            {md.wind}KM
          </div>
          <span id="spec">
            <span>Humidity</span>
            <br></br>
            {md.humid}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
