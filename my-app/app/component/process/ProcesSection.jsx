"use client";

import { useState } from "react";
import "./process.css";

export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Consultation",
      description:
        "Share your vision — dimensions, usage, aesthetic. Our stone advisors help you identify the perfect material.",
    },
    {
      number: "02",
      title: "Sample Selection",
      description:
        "We send physical samples to your site. Every slab is unique; see and feel before you decide.",
    },
    {
      number: "03",
      title: "Custom Processing",
      description:
        "Slabs are cut, finished, and polished to your exact specs at our Bangalore processing facility.",
    },
    {
      number: "04",
      title: "Delivery & Support",
      description:
        "Insured delivery with our logistics team. Installation guidance and after-care support included.",
    },
  ];

  const total = steps.length;
  const [current, setCurrent] = useState(0);

  const goTo = (index) => {
    if (index >= 0 && index < total) {
      setCurrent(index);
    }
  };

  const move = (direction) => {
    const next = current + direction;

    if (next >= 0 && next < total) {
      setCurrent(next);
    }
    // If you have a sendPrompt() function, you can uncomment this:
    /*
    else if (next >= total) {
      sendPrompt(
        "I want to enquire about getting a stone quote for my project"
      );
    }
    */
  };

  return (
    <section id="process" className="process-section">
      <div style={{ maxWidth: "680px" }}>
        <p className="section-eyebrow reveal">How It Works</p>

        <h2 className="section-title reveal">
          From <em>Quarry</em> to Your Space
        </h2>
      </div>

      <div className="process-steps">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`process-step ${
              current === index ? "active" : ""
            }`}
            onClick={() => goTo(index)}
          >
            <div className="step-num">{step.number}</div>

            <div className="step-title">{step.title}</div>

            <div className="step-desc">{step.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}




