"use client";
import { useState } from "react";
import "./flipCard.css";

export default function FlipCard() {
  const [flip, setFlip] = useState(false);
  
  return (
    <div className="flip-card-container" onClick={() => setFlip(!flip)}>
      <div className={`flip-card ${flip ? "flip-card-anim" : ""}`}>
        {/* Front face */}
        <div className="flip-card-front">
          <span>Front Question</span>
        </div>
        
        {/* Back face */}
        <div className="flip-card-back">
          <span>Back Answer</span>
        </div>
      </div>
    </div>
  );
}