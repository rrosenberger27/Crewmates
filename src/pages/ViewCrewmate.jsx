import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getCrewmate, deleteCrewmate } from "../supabase_utils";
import Loading from "../components/Loading";
import { traits_to_skills } from "../mappings";


const ViewCrewmate = () => {
    const { id } = useParams();
    const [crewmate, setCrewmate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [skills, setSkills] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            getCrewmate(id).then((crewmate) => {
                setCrewmate(crewmate);
                setSkills(traits_to_skills[crewmate.trait]);
                setLoading(false);
            });
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }, [id]);
    return (
        <div className="view-crewmate-container">
            {loading ? <Loading /> : 
            (
            <div className="view-crewmate-card">
                <div className="view-crewmate-card-header">
                    <div className="view-crewmate-card-buttons">
                        <button className="gallery-button" onClick={() => navigate("/gallery")}> &larr; </button>
                        <button className="edit-button" onClick={() => navigate(`/edit/${id}`)}> &#9998; </button>
                        <button className="delete-button" onClick={() => deleteCrewmate(id)}> &#10006; </button>
                    </div>
                    <h1> {crewmate.name} </h1>
                </div>
                <MiniCrewmate crewmate={crewmate} />
                <p> Height: {crewmate.height} </p>
                <p> Color: {crewmate.color} </p>
                <p> Trait: {crewmate.trait} </p>
                <p> {skills[0]}: {crewmate.skill_one}</p>                
                <p> {skills[1]}: {crewmate.skill_two}</p>                
                <p> {skills[2]}: {crewmate.skill_three}</p>                
            </div>
            )}
        </div>
    )
}

export default ViewCrewmate;