import React from "react";

const WeatherSection = ({ id, title, icon, details }) => (
  <div className="item">
    <h2 className="header" id={`heading${id}`}>
      {title} <i className={icon}></i>
    </h2>
    <div id={`section-${id}`} aria-labelledby={`heading${id}`}>
      <div className="body">
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
