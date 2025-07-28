import React from "react";
import GalleryCrewmateCard from "../components/GalleryCrewmateCard";
import { useEffect, useState } from "react";
import { getCrewmates } from "../supabase_utils";
import Loading from "../components/Loading";
import "../styles/Gallery.css";

const Gallery = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCrewmates = async () => {
      try {
        setError("");
        const data = await getCrewmates();
        setCrewmates(data);
      } catch (error) {
        console.error("Error fetching crewmates: ", error);
        setError("Failed to fetch crewmates.");
      } finally {
        setLoading(false);
      }
    };
    fetchCrewmates();
  }, []);

  const handleDeleteCrewmate = (deletedId) => {
    setCrewmates((prevCrewmates) =>
      prevCrewmates.filter((crewmate) => crewmate.id !== deletedId)
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="gallery-container">
      <h1>Gallery</h1>
      <div className="gallery-grid">
        {crewmates.length > 0 ? (
          crewmates.map((crewmate) => (
            <GalleryCrewmateCard
              key={crewmate.id}
              crewmate={crewmate}
              onDelete={handleDeleteCrewmate}
            />
          ))
        ) : (
          <p>No crewmates found. Create one!</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
