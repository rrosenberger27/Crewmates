import React from "react";
import "../styles/MiniCrewmate.css";

const MiniCrewmate = ({ color }) => {
  return (
    <div className="mini-crewmate-body" style={{ backgroundColor: color }}>
      <div className="mini-crewmate-visor"></div>
      <div className="mini-crewmate-legs"></div>
      <div className="mini-crewmate-backpack"></div>
    </div>
  );
};

export default MiniCrewmate;
