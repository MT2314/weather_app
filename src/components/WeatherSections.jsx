import React from "react";

const WeatherSection = ({ id, title, icon, details }) => (
  <div className="accordion-item">
    <h2 className="accordion-header" id={`heading${id}`}>
      <button
        className="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#collapse${id}`}
        aria-expanded="true"
        aria-controls={`collapse${id}`}
      >
        {title} <i className={icon}></i>
      </button>
    </h2>
    <div
      id={`collapse${id}`}
      className="accordion-collapse collapse"
      aria-labelledby={`heading${id}`}
      data-bs-parent="#weatherAccordion"
    >
      <div className="accordion-body">
        <div className="weather-detail">
          {details.map((detail, index) => (
            <div className="temp-item" key={index}>
              <strong>{detail.label}</strong> {detail.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default WeatherSection;
