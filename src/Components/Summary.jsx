import SingleCard from "./SingleCard";
import "./singleCard.css";

export default function Summary() {
  return (
    <>
      <h1>Weekly report</h1>
      <div className="summary__cards">
        <SingleCard></SingleCard>
        {/* {arrayData.map((card) => {
          <SingleCard key={card.id} name={card.name} />;
        })} */}
      </div>
    </>
  );
}
