import React from "react";
import "./InstructionPage.css";

export default function InstructionPage() {
  return (
    <section className="instruction-container">

      <div className="instruction-right">
        <h1>How to Start Your IT Journey</h1>

        <p>
          Follow the structured roadmap carefully. Start with fundamentals,
          practice consistently, build real-world projects, and strengthen
          core computer science concepts.
        </p>

        <ul>
          <li>✔ Master one programming language</li>
          <li>✔ Practice DSA daily</li>
          <li>✔ Build 2-3 real-world projects</li>
          <li>✔ Learn system design basics</li>
        </ul>

        <button className="instruction-btn">
          Get Started
        </button>
      </div>


      
      <div className="instruction-left">
        <img src="./image333.jpg" alt="Instructor" />
      </div>


    </section>
  );
}