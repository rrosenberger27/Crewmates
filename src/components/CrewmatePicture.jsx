import React from "react";
import "../styles/CrewmatePicture.css";
import MiniCrewmate from "./MiniCrewmate";

const CrewmatePicture = () => {
  const colors = [
    "#c51111",
    "#132ed1",
    "#117f2d",
    "#ed54ba",
    "#ef7d0e",
    "#f5f557",
    "#3f474e",
    "#d6e0f0",
    "#6b2fbb",
    "#71491e",
    "#38fedc",
    "#50ef39",
  ];
  const topRowColors = colors.slice(0, 6);
  const bottomRowColors = colors.slice(6, 12);

  return (
    <div className="crewmate-picture-container">
      <div className="crewmate-row">
        {topRowColors.map((color, index) => (
          <MiniCrewmate key={index} color={color} />
        ))}
      </div>
      <div className="crewmate-row">
        {bottomRowColors.map((color, index) => (
          <MiniCrewmate key={index} color={color} />
        ))}
      </div>
    </div>
  );
};

export default CrewmatePicture;
