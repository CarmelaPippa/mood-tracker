import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

import arrow from "../assets/img/arrow_forward.svg";
import feelingsData from "./feelingsData.js";

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

const getDayName = () => {
  return days[date.getDay()];
};

// Function to get greeting based on the current time
const getGreeting = () => {
  const hour = new Date().getHours();
  return hour < 12
    ? "Good morning!"
    : hour < 18
    ? "Good afternoon!"
    : "Good evening!";
};

const saveMood = (day, newElement) => {
  const saveElement = JSON.parse(localStorage.getItem("dailyData") || "[]");

  saveElement.push({ day: day, mood: newElement });
  localStorage.setItem("dailyData", JSON.stringify(saveElement));
  console.log("save", saveElement);
};

export default function Login() {
  const apiKeys = import.meta.env.VITE_APIKEY;

  // State variables for selected card and user comment
  const [selectedMood, setSelectedMood] = useState(null);
  const [comment, setComment] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();

  // Get the current date

  const getWeather = useCallback(async () => {
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
  }, [apiKeys]);

  useEffect(() => {
    const fetchWeather = async () => {
      const weather = await getWeather();
      setWeatherData(weather); // Store the weather data in state
    };

    fetchWeather();
  }, [getWeather]);

  // Function to handle card selection
  const handleCardSelect = useCallback((e) => {
    setSelectedMood(e);
  }, []);

  // Function to handle comment input`
  const handleInput = useCallback((event) => {
    setComment(event.target.value);
  }, []);

  // Function to handle form submission
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const submitData = {
        mood: selectedMood,
        comment: comment || "No Comment",
        day: getDayName(),
        weather: weatherData, // Include the weather data
      };
      console.log("");
      const today = new Date().toISOString().split("T")[0];
      saveMood(today, submitData);
      navigate("/summary");
    },
    [comment, navigate, selectedMood, weatherData]
  );

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
                selectedMood && selectedMood.id === card.id
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
        <h2>{"Let's write about it.."}</h2>

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
