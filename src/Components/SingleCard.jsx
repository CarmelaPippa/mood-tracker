import "./singleCard.css";

export default function SingleCard() {
  return (
    <>
      <div className="summary__card">
        <div className="titleDay">
          <p>Monday</p>
          <p>weather</p>
        </div>
        <div className="dayly__mood">
          <img src="" alt="Emoticon" />
          <p>Name of mood</p>
        </div>
        <div className="dayly__mood">
          <img src="" alt="icon-comment" />
          <p>Message</p>
        </div>
      </div>
    </>
  );
}
