import React from "react";

import "../css/Score.css";

export default function Score(props) {
  return (
    <div className="game-header-wrapper">
      <div>High Score: {props.highScore}</div>
      <div className="question-number">Question #{props.questionNumber}</div>
      <div className="score">{props.score} Points</div>
    </div>
  );
}
