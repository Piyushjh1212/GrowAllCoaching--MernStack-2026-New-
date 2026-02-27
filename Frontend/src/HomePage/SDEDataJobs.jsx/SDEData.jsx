import { useState, useRef, useEffect } from "react";
import "./SDEData.css";

const roadmapData = {
  SDE: [
    {
      title: "Programming",
      desc: "Master one language deeply (Recommended: Java).",
      topics: [
        "Variables & Data Types",
        "Loops & Conditionals",
        "Functions / Methods",
        "OOPS Concepts",
        "Exception Handling",
        "Collections Framework",
        "Multithreading (Basics)"
      ]
    },
    {
      title: "DSA",
      desc: "Practice daily structured problem solving.",
      topics: [
        "Time & Space Complexity",
        "Arrays",
        "Recursion",
        "Sorting",
        "Binary Search",
        "Stack & Queue",
        "Linked List",
        "Trees",
        "Graphs",
        "Dynamic Programming"
      ]
    },
    {
      title: "Core CS",
      desc: "Strong theoretical foundation.",
      topics: [
        "Operating System",
        "DBMS",
        "Computer Networks",
        "SQL",
        "REST API"
      ]
    },
    {
      title: "System Design",
      desc: "Design scalable backend systems.",
      topics: [
        "Client-Server Architecture",
        "Load Balancing",
        "Caching",
        "Database Scaling",
        "Microservices"
      ]
    },
    {
      title: "Projects",
      desc: "Build real-world scalable applications.",
      topics: [
        "Full Stack Web App",
        "Authentication System",
        "Payment Integration",
        "Deployment",
        "CI/CD Basics"
      ]
    }
  ],

  "Frontend Dev": [
    { title: "HTML/CSS", desc: "Responsive layouts mastery." },
    { title: "JavaScript", desc: "ES6+ mastery." },
    { title: "React", desc: "Hooks & performance." }
  ],
    "Backend Dev": [
    { title: "HTML/CSS", desc: "Responsive layouts mastery." },
    { title: "JavaScript", desc: "ES6+ mastery." },
    { title: "React", desc: "Hooks & performance." }
  ]
,
   "Data Analytics": [
    { title: "HTML/CSS", desc: "Responsive layouts mastery." },
    { title: "JavaScript", desc: "ES6+ mastery." },
    { title: "React", desc: "Hooks & performance." }
  ],
     "UI/UX Design": [
    { title: "HTML/CSS", desc: "Responsive layouts mastery." },
    { title: "JavaScript", desc: "ES6+ mastery." },
    { title: "React", desc: "Hooks & performance." }
  ]
};

export default function SDEdata() {
  const [category, setCategory] = useState("SDE");
  const [active, setActive] = useState(0);
  const detailRef = useRef(null);

  const steps = roadmapData[category] || [];

  // 🔥 reset active safely when category changes
  useEffect(() => {
  }, [category]);

  const handleStepClick = (index) => {
    setActive(index);
    detailRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const currentStep = steps[active];

  return (
    <>
      {/* CATEGORY BUTTONS */}
      <div className="sde-category-buttons">
        {Object.keys(roadmapData).map((cat) => (
          <button
            key={cat}
            className={category === cat ? "sde-active-btn" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MAIN SECTION */}
      <section className="sde-container">
        <div className="sde-left-panel">
          <img src="/SDE.png" alt="Guide" />
        </div>

        <div className="sde-right-panel">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step ${active === index ? "sde-step-active" : ""}`}
              onClick={() => handleStepClick(index)}
            >
              <div className="sde-step-number">{index + 1}</div>
              <div className="sde-step-title">{step.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DETAIL SECTION */}
      {currentStep && (
        <section className="sde-detail-section" ref={detailRef}>
          <div className="sde-detail-section-heading">
            <h2>{currentStep.title}</h2>
          </div>

          <p>{currentStep.desc}</p>

          {currentStep.topics && (
            <ul>
              {currentStep.topics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
}