import React, { useState } from "react";
import { createCrewmate } from "../supabase_utils";
import { useNavigate } from "react-router";
import { traits } from "../mappings";
import ColorSlider from "../components/ColorSlider";
import TraitSelector from "../components/TraitSelector";
import SkillPointAllocator from "../components/SkillPointAllocator";
import "../styles/CreateCrewmate.css";
import MiniCrewmate from "../components/MiniCrewmate";
import Loading from "../components/Loading";

const CreateCrewmate = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#FF5733");
  const [trait, setTrait] = useState(traits[0]);
  const [skills, setSkills] = useState([0, 0, 0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter a name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const crewmate = {
        name,
        color,
        trait,
        skill_one: skills[0],
        skill_two: skills[1],
        skill_three: skills[2],
      };
      await createCrewmate(crewmate);
      navigate("/gallery");
    } catch (error) {
      console.error(error);
      setError("Failed to create crewmate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

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
        {error && <p className="error-message">{error}</p>}
        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Creating..." : "Create Crewmate"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCrewmate;
