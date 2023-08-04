import React from "react";

import "../css/Difficulty.css";

export default function Difficulty(props) {
  return (
    <div className="difficulty-selector__wrapper">
      <button className={props.difficulty === "easy" ? "selected" : null}onClick={() => props.setDifficulty('easy')}>
        Easy
      </button>
      <button className={props.difficulty === "medium" ? "selected" : null} onClick={() => props.setDifficulty('medium')}>
        Medium
      </button>
      <button className={props.difficulty === "hard" ? "selected" : null} onClick={() => props.setDifficulty('hard')}>
        Hard
      </button>
    </div>
  );
}
