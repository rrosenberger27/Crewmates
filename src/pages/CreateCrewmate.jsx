import React, { useState } from "react";
import { createCrewmate } from "../supabase_utils";
import { useNavigate } from "react-router";
import { traits } from "../mappings";
import ColorSlider from "../components/ColorSlider";
import TraitSelector from "../components/TraitSelector";
import SkillPointAllocator from "../components/SkillPointAllocator";
import "../styles/CreateCrewmate.css";
import MiniCrewmate from "../components/MiniCrewmate";

const CreateCrewmate = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#FF5733");
  const [height, setHeight] = useState(5);
  const heightMultiplier = 20;
  const [trait, setTrait] = useState(traits[0]);
  const [skills, setSkills] = useState([0, 0, 0]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter a name");
      return;
    }
    try {
      const crewmate = {
        name,
        color,
        trait,
        skill_one: skills[0],
        skill_two: skills[1],
        skill_three: skills[2],
      };
      createCrewmate(crewmate);
      navigate("/gallery");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-crewmate-container">
      <h1>Create Crewmate</h1>
      <MiniCrewmate color={color} />
      <form type="submit" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <ColorSlider color={color} setColor={setColor} />
        <TraitSelector trait={trait} setTrait={setTrait} />
        <SkillPointAllocator
          trait={trait}
          skills={skills}
          setSkills={setSkills}
        />
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Create Crewmate
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCrewmate;
