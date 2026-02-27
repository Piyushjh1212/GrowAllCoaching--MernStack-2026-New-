import { forwardRef } from "react";
import "./SDEData.css";

const SDEmaindata = forwardRef(
  ({ step, stepIndex = 0, totalSteps = 0 }, ref) => {

    // 🔥 Safety check (important)
    if (!step) return null;

    return (
      <section className="sde-detail-section" ref={ref}>
        <div className="sde-detail-header">
          <span className="sde-step-badge">
            STEP {stepIndex + 1} / {totalSteps}
          </span>

          <h2>{step.title}</h2>
          <p className="sde-duration">Duration: {step.duration}</p>
        </div>

        <div className="sde-detail-content">
          <ul>
            {step.details?.map((item, i) => (
              <li key={i}>✔ {item}</li>
            ))}
          </ul>
        </div>

        {stepIndex !== totalSteps - 1 && (
          <div className="sde-next-step">
            ↓ Next: Step {stepIndex + 2}
          </div>
        )}
      </section>
    );
  }
);

export default SDEmaindata;