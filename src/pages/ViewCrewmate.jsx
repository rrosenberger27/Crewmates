import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getCrewmate, deleteCrewmate } from "../supabase_utils";
import Loading from "../components/Loading";
import { traits_to_skills } from "../mappings";
import MiniCrewmate from "../components/MiniCrewmate";
import "../styles/ViewCrewmate.css";

const ViewCrewmate = () => {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        setError("");
        const data = await getCrewmate(id);
        setCrewmate(data);
        setSkills(traits_to_skills[data.trait]);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch crewmate data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCrewmate();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this crewmate?")) {
      try {
        await deleteCrewmate(id);
        navigate("/gallery");
      } catch (error) {
        console.error("Error deleting crewmate:", error);
        setError("Failed to delete crewmate.");
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="view-crewmate-container">
      {crewmate && (
        <div className="view-crewmate-card">
          <div className="view-crewmate-card-header">
            <div className="view-crewmate-card-buttons">
              <button
                className="gallery-button"
                onClick={() => navigate("/gallery")}
              >
                {" "}
                &larr;{" "}
              </button>
              <button
                className="edit-button"
                onClick={() => navigate(`/edit/${id}`)}
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
          <p> Category: {crewmate.trait} </p>
          <p> Skills :</p>
          <p>
            {" "}
            {skills[0]}: {crewmate.skill_one}
          </p>
          <p>
            {" "}
            {skills[1]}: {crewmate.skill_two}
          </p>
          <p>
            {" "}
            {skills[2]}: {crewmate.skill_three}
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewCrewmate;
