import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { updateCrewmate, getCrewmate, deleteCrewmate } from "../supabase_utils";
import { traits } from "../mappings";
import MiniCrewmate from "../components/MiniCrewmate";
import ColorSlider from "../components/ColorSlider";
import TraitSelector from "../components/TraitSelector";
import SkillPointAllocator from "../components/SkillPointAllocator";
import Loading from "../components/Loading";
import "../styles/EditCrewmate.css";

const EditCrewmate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        setError("");
        const data = await getCrewmate(id);
        setCrewmate(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch crewmate data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCrewmate();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCrewmate((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!crewmate.name) {
      setError("Name field can't be empty");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await updateCrewmate(id, crewmate);
      navigate(`/view/${id}`);
    } catch (err) {
      console.error("An error occurred trying to update:", err);
      setError("Failed to update crewmate.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this crewmate?")) {
      try {
        await deleteCrewmate(id);
        navigate("/gallery");
      } catch (err) {
        console.error("Error deleting crewmate:", err);
        setError("Failed to delete crewmate.");
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="error-message">{error}</p>;
  if (!crewmate) return null;

  return (
    <div className="edit-crewmate-container">
      <div className="edit-crewmate-header">
        <div className="edit-crewmate-buttons">
          <button
            className="gallery-button"
            onClick={() => navigate("/gallery")}
          >
            &larr;
          </button>
          <button
            className="view-button"
            onClick={() => navigate(`/view/${id}`)}
          >
            &#128270;
          </button>
          <button className="delete-button" onClick={handleDelete}>
            &#10006;
          </button>
        </div>
        <h1>Edit Crewmate</h1>
      </div>

      <MiniCrewmate color={crewmate.color} />
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={crewmate.name}
          onChange={handleChange}
        />
        <ColorSlider
          color={crewmate.color}
          setColor={(color) => setCrewmate((prev) => ({ ...prev, color }))}
        />
        <TraitSelector
          trait={crewmate.trait}
          setTrait={(trait) => setCrewmate((prev) => ({ ...prev, trait }))}
        />
        <SkillPointAllocator
          trait={crewmate.trait}
          skills={[
            crewmate.skill_one,
            crewmate.skill_two,
            crewmate.skill_three,
          ]}
          setSkills={(skills) =>
            setCrewmate((prev) => ({
              ...prev,
              skill_one: skills[0],
              skill_two: skills[1],
              skill_three: skills[2],
            }))
          }
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Updating..." : "Update Crewmate"}
        </button>
      </form>
    </div>
  );
};

export default EditCrewmate;
