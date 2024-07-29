import "./singleCard.css";
import PropTypes from "prop-types";

export default function SingleCard({ day }) {
  return (
    <>
      <div className="summary__card">
        <div className="titleDay">
          <p>{day}</p>
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

SingleCard.propTypes = { day: PropTypes.string.isRequired };
