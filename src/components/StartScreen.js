import React, { useState } from "react";

import CssTransition from "react-transition-group/CssTransition";

import Card from "./Card";
import Difficulty from "./Difficulty";
import "../css/StartScreen.css";

export default function StartScreen(props) {
  const [inProp, setInProp] = useState(true);

  const handleUpdate = () => {
    setInProp(false); // idk if this works
    setTimeout(() => {props.handleUpdate(0);}, 700)
    
  };

  return (
    <CssTransition
      in={inProp}
      timeout={500}
      mountOnEnter
      unmountOnExit
      classNames="start"
    >
      <div>
        <Card className="start-screen">
          <p>Welcome to my quiz game!</p>
          <p>The game is 10 questions long.</p>
          <p>
            You get 100 points for correct easy questions, 200 for medium
            questions, and 300 for hard questions.
          </p>
          <p>Try for a new High Score!</p>
          <Difficulty difficulty={props.difficulty} setDifficulty={props.setDifficulty}/>
          <button className="start-button" onClick={handleUpdate}>
            Start Game
          </button>
        </Card>
      </div>
    </CssTransition>
  );
}
