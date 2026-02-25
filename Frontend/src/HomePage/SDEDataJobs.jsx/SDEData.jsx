import { useState, useRef } from "react";
import "./SDEData.css";
import SDEmaindata from "./SDEmaindata";

const roadmapData = {
  SDE: [
    { title: "Programming", desc: "Master Java/C++ deeply." },
    { title: "DSA", desc: "Practice daily problem solving." },
    { title: "Core CS", desc: "OS, DBMS, CN strong concepts." },
    { title: "System Design", desc: "Scalable system design." },
    { title: "Projects", desc: "Build scalable projects." }
  ],
  "Data Analytics": [
    { title: "Python", desc: "Numpy, Pandas mastery." },
    { title: "Statistics", desc: "Probability, hypothesis testing." },
    { title: "Visualization", desc: "Power BI / Tableau." },
    { title: "SQL", desc: "Advanced queries & joins." }
  ],
  "Frontend Dev": [
    { title: "HTML/CSS", desc: "Strong layout & responsive design." },
    { title: "JavaScript", desc: "ES6+ mastery." },
    { title: "React", desc: "Hooks, state, performance." },
    { title: "UI/UX", desc: "Design thinking basics." }
  ],
  "Backend Dev": [
    { title: "Node.js", desc: "API building mastery." },
    { title: "Database", desc: "MongoDB / SQL deep knowledge." },
    { title: "Auth", desc: "JWT, security." },
    { title: "Scaling", desc: "Caching & optimization." }
  ],
  DevOps: [
    { title: "Linux", desc: "Command line mastery." },
    { title: "Docker", desc: "Containerization." },
    { title: "CI/CD", desc: "Automation pipelines." },
    { title: "Cloud", desc: "AWS / Azure basics." }
  ]
};

export default function SDEdata() {
  const [category, setCategory] = useState("SDE");
  const [active, setActive] = useState(0);
  const detailRef = useRef(null);

  const steps = roadmapData[category];

  const handleStepClick = (index) => {
    setActive(index);
    detailRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setActive(0);
  };

  return (
    <>
      {/* 🔥 TOP CATEGORY BUTTONS */}
      <div className="category-buttons">
        {Object.keys(roadmapData).map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active-btn" : ""}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <section className="sde-container">
        <div className="left-panel">
          <img src="./SDE.png" alt="Guide" />
        </div>

        <div className="right-panel">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step ${active === index ? "active" : ""}`}
              onClick={() => handleStepClick(index)}
            >
              <span className="step-number">{index + 1}</span>
              {step.title}
            </div>
          ))}
        </div>
      </section>

      <SDEmaindata step={steps[active]} ref={detailRef} />
    </>
  );
}