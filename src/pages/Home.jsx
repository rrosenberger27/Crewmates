import React from "react";
import CrewmatePicture from "../components/CrewmatePicture";
import "../styles/Home.css";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Crewmate Creator!</h1>
      <CrewmatePicture />
      <p>Create, view, and manage your own custom crewmates.</p>
      <div className="home-actions">
        <Link to="/create" className="button-link">
          Create a Crewmate
        </Link>
        <Link to="/gallery" className="button-link">
          View Gallery
        </Link>
      </div>
    </div>
  );
};

export default Home;
