import React from "react";
import "../styles/HeightSlider.css";

const HeightSlider = ({ height, setHeight }) => {
  return (
    <div className="height-slider-container">
      <label htmlFor="height-slider">Height: {height}m</label>
      <input
        type="range"
        id="height-slider"
        min="1"
        max="10"
        step="0.1"
        value={height}
        onChange={(e) => setHeight(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default HeightSlider;
