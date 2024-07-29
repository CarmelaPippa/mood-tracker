import SingleCard from "./SingleCard";
import "./singleCard.css";

export default function Summary() {
  const arrayData = JSON.parse(localStorage.getItem("dailyData"));
  return (
    <>
      <h1>Weekly report</h1>
      <div className="summary__cards">
        {arrayData.map((card, index) => (
          <SingleCard key={index} day={card.mood.day} />
        ))}
      </div>
    </>
  );
}
