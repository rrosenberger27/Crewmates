import React from "react";
import { traits_to_skills } from "../mappings";
import "../styles/SkillPointAllocator.css";

const SkillPointAllocator = ({ trait, skills, setSkills }) => {
  const skillNames = traits_to_skills[trait] || [];
  const totalPoints = 100;
  const pointsUsed = skills.reduce((a, b) => a + b, 0);
  const pointsLeft = totalPoints - pointsUsed;

  const handleSkillChange = (index, value) => {
    const newValue = parseInt(value, 10);
    const oldValue = skills[index];

    const delta = newValue - oldValue;

    if (delta <= pointsLeft) {
      const newSkills = [...skills];
      newSkills[index] = newValue;
      setSkills(newSkills);
    } else {
      const newSkills = [...skills];
      newSkills[index] = oldValue + pointsLeft;
      setSkills(newSkills);
    }
  };

  return (
    <div className="skill-point-allocator-container">
      <h3>Skills</h3>
      <h4>Points left: {pointsLeft}</h4>
      {skillNames.map((skillName, index) => {
        return (
          <div key={skillName} className="skill-slider-group">
            <label htmlFor={`${skillName}-slider`}>
              {skillName}: {skills[index]}
            </label>
            <input
              type="range"
              id={`${skillName}-slider`}
              min="0"
              max={totalPoints}
              value={skills[index]}
              onChange={(e) => handleSkillChange(index, e.target.value)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SkillPointAllocator;
