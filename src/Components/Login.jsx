/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

import arrow from "../assets/img/arrow_forward.svg";
import feelingsData from "./feelingsData.js";

export default function Login(submitData) {
  const apiKeys = "419bf51994e709c5f06805b46d038b94";

  // State variables for selected card and user comment
  const [selectedCard, setSelectedCard] = useState(null);
  const [comment, setComment] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();

  // Get the current date
  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function saveMood(element, newElement) {
    const saveElement = JSON.parse(localStorage.getItem("dailyData") || "{}");
    if (!saveElement[element]) {
      saveElement[element] = [];
    }
    saveElement[element].push(newElement);
    localStorage.setItem("dailyData", JSON.stringify(saveElement));
  }

  const getWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=stockholm&appid=${apiKeys}&units=metric`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const temp = Math.floor(result.main.temp);

      return temp;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const weather = await getWeather();
      setWeatherData(weather); // Store the weather data in state
    };

    fetchWeather();
  }, []);

  // Function to get greeting based on the current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    return hour < 12
      ? "Good morning!"
      : hour < 18
      ? "Good afternoon!"
      : "Good evening!";
  };

  const getDayName = () => {
    return days[date.getDay()];
  };

  // Function to handle card selection
  const handleCardSelect = (e) => {
    setSelectedCard(e);
  };
  // Function to handle comment input`
  const handleInput = (event) => {
    setComment(event.target.value);
  };
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    submitData = {
      card: selectedCard,
      comment: comment || "No Comment",
      day: getDayName(),
      weather: weatherData, // Include the weather data
    };
    console.log("submitData", submitData);
    const today = new Date().toISOString().split("T")[0];
    saveMood(today, submitData);
    navigate("/summary");
  };

  return (
    <>
      <section className="section--login">
        <h1>
          {getGreeting()} <br /> How are you feeling today?
        </h1>
        <div className="cards">
          {feelingsData.map((card) => (
            <div
              key={card.id}
              className={`card ${
                selectedCard && selectedCard.id === card.id
                  ? "selected-card"
                  : ""
              }`}
              style={{ backgroundColor: card.backgroundColor }}
              onClick={() => handleCardSelect(card)}
            >
              <img src={card.img} alt={card.name} />
              <h2>{card.name}</h2>
            </div>
          ))}
        </div>
        <h2>Let's write about it..</h2>

        <input
          type="text"
          placeholder="How is your day going? How has it affected your mood? or anything else.."
          onChange={handleInput}
        />
        <button type="submit" onClick={handleSubmit}>
          Continue <img src={arrow} alt="arrow"></img>
        </button>
      </section>
    </>
  );
}
