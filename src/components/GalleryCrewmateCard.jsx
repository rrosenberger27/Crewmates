import React from "react";
import "../styles/GalleryCrewmateCard.css";
import { useNavigate } from "react-router";
import MiniCrewmate from "./MiniCrewmate";
import { traits_to_skills } from "../mappings";
import { deleteCrewmate } from "../supabase_utils";

const GalleryCrewmateCard = ({ crewmate, onDelete }) => {
  const skills = traits_to_skills[crewmate.trait] || [];
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${crewmate.name}?`)) {
      try {
        await deleteCrewmate(crewmate.id);
        onDelete(crewmate.id);
      } catch (error) {
        console.error("Failed to delete crewmate", error);
        alert("Failed to delete crewmate.");
      }
    }
  };

  return (
    <div className="gallery-crewmate-card">
      <div className="gallery-crewmate-card-header">
        <div className="gallery-crewmate-card-buttons">
          <button
            className="view-button"
            onClick={() => navigate(`/view/${crewmate.id}`)}
          >
            {" "}
            &#128270;{" "}
          </button>
          <button
            className="edit-button"
            onClick={() => navigate(`/edit/${crewmate.id}`)}
          >
            {" "}
            &#9998;{" "}
          </button>
          <button className="delete-button" onClick={handleDelete}>
            {" "}
            &#10006;{" "}
          </button>
        </div>
        <h1> {crewmate.name} </h1>
      </div>
      <MiniCrewmate color={crewmate.color} />
      <p> Trait : {crewmate.trait} </p>
      {skills.length > 0 && (
        <>
          <p>
            {" "}
            {skills[0]} : {crewmate.skill_one}
          </p>
          <p>
            {" "}
            {skills[1]} : {crewmate.skill_two}
          </p>
          <p>
            {" "}
            {skills[2]} : {crewmate.skill_three}
          </p>
        </>
      )}
    </div>
  );
};

export default GalleryCrewmateCard;
