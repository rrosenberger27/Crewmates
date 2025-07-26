import React from "react";
import { updateCrewmate, getCrewmate } from "../supabase_utils";
import { traits, traits_to_skills } from "../mappings";
import MiniCrewmate from "../components/MiniCrewmate";
import ColorSlider from "../components/ColorSlider";
import TraitSelector from "../components/TraitSelector";
import SkillPointAllocator from "../components/SkillPointAllocator";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import "../styles/CreateCrewmate.css";
import { useParams, useNavigate } from "react-router";

const EditCrewmate = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [crewmate, setCrewmate] = useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchCrewmate = async () => {
            try {
                const crewmate = await getCrewmate(id);
                setCrewmate(crewmate);
                setLoading(false);
            } catch (error) {
                console.error("Error occured in call to get crewmate: ", e);
                setLoading(false)
            }
        }
        fetchCrewmate();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name) {
            alert("Name field can't be empty");
            return;

        }
        try {
            await updateCrewmate(crewmate.id, crewmate);
            navigate('/gallery')
        } catch (error) {
            console.error("An error occured trying to submit")
        }
    }

    return (
        <div className="edit-crewmate-container">  
        {loading ? <Loading /> : 
        (
        <div>
            <div className="edit-crewmate-header">
                <div className="edit-crewmate-buttons">
                    <button className="gallery-button" onClick={() => navigate("/gallery")}> &larr; </button>
                    <button className="view-button" onClick={() => navigate(`/view/${id}`)}> &#128270; </button>
                    <button className="delete-button" onClick={() => deleteCrewmate(id)}> &#10006; </button>
                </div>

                <h1>Edit Crewmate</h1>
            </div>
            
            <MiniCrewmate
                color={crewmate.color}
            />
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
                <button type="submit" className="create-button">Create!</button>
            </form> 
      </div>         
        )}
    </div>
    )
}

export default EditCrewmate;