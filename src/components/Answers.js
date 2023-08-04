import React from "react";

import Answer from "./Answer";
import "../css/Answers.css";

// This exists to declutter the Game component
export default function Answers(props) {
  const answerHandler = (answer) => {
    props.verify(answer);
  };

  return (
    <div className="answers-wrapper">
      <Answer verify={answerHandler} answer={props.answers[0]} />
      <Answer id={1} verify={answerHandler} answer={props.answers[1]} />
      <Answer id={2} verify={answerHandler} answer={props.answers[2]} />
      <Answer id={3} verify={answerHandler} answer={props.answers[3]} />
    </div>
  );
}
