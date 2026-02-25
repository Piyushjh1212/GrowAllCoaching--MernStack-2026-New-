import { forwardRef } from "react";
import "./SDEmaindata.css";

const SDEmaindata = forwardRef(({ step }, ref) => {
  return (
    <section className="detail-section" ref={ref}>
      
      <div className="detail-left">
        <div className="vertical-line"></div>
        <h2>{step.title}</h2>
      </div>

      <div className="detail-right">
        <p>{step.desc}</p>
      </div>

    </section>
  );
});

export default SDEmaindata;