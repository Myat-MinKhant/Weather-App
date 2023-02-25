const container = document.querySelector(".container");
const input = document.querySelector(".search-box input");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".error404");
const image = document.querySelector(".weather-box img");
const tempreature = document.querySelector(".tempreature");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity span");
const wind = document.querySelector(".wind span");

search.addEventListener("click", () => {
  const APIKey = "39ff28566cb55158004ecb3655f793a6";
  const city = input.value;
  console.log(city);

  if (city === "") return;

  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.cod === "404") {
        container.style.height = "500px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error.style.display = "block";
        error.classList.add("fadeIn");
        return;
      }
      error.style.display = "none";
      error.classList.remove("fadeIn");

      switch (data.weather[0].main) {
        case "Clear":
          image.src = "./images/clear.png";
          break;
        case "Rain":
          image.src = "./images/rain.png";
          break;

        case "Clouds":
          image.src = "./images/cloud.png";
          break;

        case "Snow":
          image.src = "./images/snow.png";
          break;

        case "Haze":
          image.src = "./images/mist.png";
          break;

        default:
          image.src = "";
      }

      tempreature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
      description.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "620px";
    });
});
