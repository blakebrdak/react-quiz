import React from "react";

import Card from "./Card";
import '../css/Endscreen.css';

export default function Endscreen( props ) {
    

    return <Card className='endscreen'>
        <p>You Earned <span className='number'>{props.score}</span> Points!</p>
        <p>Previous High Score: <span className='number'>{props.highScore}</span> Points</p>
        {(props.highScore < props.score) ? <p>You set a new high score!!!</p> : null}
        <p>Thank you for playing!</p>
        <button onClick={props.handlePlayAgain}>Play Again?</button>
    </Card>
}