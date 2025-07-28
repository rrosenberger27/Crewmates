import React from "react";
import { traits } from "../mappings";
import "../styles/TraitSelector.css";

const TraitSelector = ({ trait, setTrait }) => {
  return (
    <div className="trait-selector-container">
      <label htmlFor="trait-select">Category</label>
      <select
        id="trait-select"
        value={trait}
        onChange={(e) => setTrait(e.target.value)}
      >
        {traits.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TraitSelector;
