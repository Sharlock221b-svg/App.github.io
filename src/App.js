import React from "react";
import "./App.css";
import drizzle from "./images/drizzling24.webp";
import clear from "./images/clear.jpg"
import clouds from "./images/clouds.jpg"
import rain from "./images/rain.jpg"
import snow from "./images/snow.jpg"
import thunderstrom from "./images/thunderstrom.jpg"

function App() {
  const [latitude, setLatitude] = React.useState(27);
  const [longitude, setLongitude] = React.useState(82);
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
    fetch(
      "https://weather-proxy.freecodecamp.rocks/api/current?lat=26.86976&lon=75.7825536"
    )
      .then((results) => results.json())
      .then((data) => {
        setMD({
          country: data.sys.country,
          name: data.name,
          temp: data.main.temp,
          weather: data.weather[0].main,
        });
      });
  }, []);

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
      <p>
        {latitude} {longitude}
      </p>
    </div>
  );
}

export default App;
