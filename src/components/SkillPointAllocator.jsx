import React, { useEffect } from "react";
import { traits_to_skills } from "../mappings";
import "../styles/SkillPointAllocator.css";

const SkillPointAllocator = ({ trait, skills, setSkills }) => {
  const skillNames = traits_to_skills[trait];
  const totalPoints = 100;
  const pointsUsed = skills.reduce((a, b) => a + b, 0);
  const pointsLeft = totalPoints - pointsUsed;

  const handleSkillChange = (index, value) => {
    const newValue = parseInt(value, 10);
    const currentPointsUsed = pointsUsed - skills[index];
    if (currentPointsUsed + newValue <= totalPoints) {
      const newSkills = [...skills];
      newSkills[index] = newValue;
      setSkills(newSkills);
    }
  };

  useEffect(() => {
    setSkills([0, 0, 0]);
  }, [trait, setSkills]);

  return (
    <div className="skill-point-allocator-container">
      <h3>Skills</h3>
      <h4>Points left: {pointsLeft}</h4>
      {skillNames.map((skillName, index) => (
        <div key={skillName} className="skill-slider-group">
          <label htmlFor={`${skillName}-slider`}>
            {skillName}: {skills[index]}
          </label>
          <input
            type="range"
            id={`${skillName}-slider`}
            min="0"
            max="100"
            value={skills[index]}
            onChange={(e) => handleSkillChange(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default SkillPointAllocator;
