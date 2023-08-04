import React from "react";

import "../css/Header.css";
import Card from "./Card";
export default function Header() {
  return (
    <Card className="header">
      <h1>Quiz Game</h1>
      <p className='my-name'>By Blake Brdak</p>
    </Card>
  );
}
