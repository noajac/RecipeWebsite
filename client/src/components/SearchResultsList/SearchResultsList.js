import "./SearchResultsList.css";
// import { SearchResult } from "../SearchResult/SearchResult";
import React from "react";
import { Link } from 'react-router-dom';

export const SearchResultsList = ({ results }) => {
  return (
    <div className="search-results-list">
      {results.length === 0 ? (
        <p className="no-results-message">No recipes found</p>
      ) : (
        results.map((recipe) => (
          <div className="recipe-card" key={recipe._id} >
            <Link to={`/recipes/${recipe._id}`} className="view-recipe-link">
              <h3>{recipe.title}</h3>
              <p>Written by {recipe.userName}</p>
              <div className="recipe-details">
              <p><strong>Level:</strong> {recipe.level}</p>
              <p><strong>Type:</strong> {recipe.type}</p>
                <p>
                  <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
                </p>
              </div>
              {/* <img 
              src={recipe.imageFile || "placeholder.jpg"} 
              alt={recipe.title} 
              className="recipe-image" 
            /> */}
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResultsList;