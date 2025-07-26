import React from "react";
import GalleryCrewmateCard from "../components/GalleryCrewmateCard";
import { useEffect, useState } from "react";
import { getCrewmates } from "../supabase_utils";
import Loading from "../components/Loading";
import "../styles/Gallery.css";

const Gallery = () => {

    const [crewmates, setCrewmates] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {        
        const fetchCrewmates = async () => {
            try {
                const crewmates = await getCrewmates();
                setCrewmates(crewmates);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching crewmates: ", error);
                setLoading(false);
            }
        }
        fetchCrewmates();
    }, []);

    return (
        <div className="gallery-container">
            <h1>Gallery</h1>
            <div className="gallery-grid">
                {crewmates.map((crewmate) => (
                    <GalleryCrewmateCard key={crewmate.id} crewmate={crewmate} />
                ))}
            </div>
        </div>
    )
}

export default Gallery;