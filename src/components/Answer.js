import React from "react";

import "../css/Answer.css";
export default function Answer(props) {
  const clickHandler = () => {
    props.verify(props.answer)
  }
  return (
    <button onClick={clickHandler}  className={`answer ${props.id === 1 ? 'a1' : props.id === 2 ? 'a2' : props.id === 3 ? 'a3' : null}`}>
      {props.answer}
    </button>
  );
}
