import React, { useState, useEffect } from "react";
import "../styles/ColorSlider.css";

function rgbToHex(r, g, b) {
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

const ColorSlider = ({ color, setColor }) => {
  const [rgb, setRgb] = useState(hexToRgb(color));

  useEffect(() => {
    setRgb(hexToRgb(color));
  }, [color]);

  const handleChange = (e) => {
    const newRgb = { ...rgb, [e.target.name]: parseInt(e.target.value) };
    setRgb(newRgb);
    setColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  return (
    <div className="color-slider-container">
      <div className="sliders">
        <div className="slider-group">
          <label>R</label>
          <input
            type="range"
            name="r"
            min="0"
            max="255"
            value={rgb.r}
            onChange={handleChange}
          />
          <span>{rgb.r}</span>
        </div>
        <div className="slider-group">
          <label>G</label>
          <input
            type="range"
            name="g"
            min="0"
            max="255"
            value={rgb.g}
            onChange={handleChange}
          />
          <span>{rgb.g}</span>
        </div>
        <div className="slider-group">
          <label>B</label>
          <input
            type="range"
            name="b"
            min="0"
            max="255"
            value={rgb.b}
            onChange={handleChange}
          />
          <span>{rgb.b}</span>
        </div>
      </div>
    </div>
  );
};

export default ColorSlider;
