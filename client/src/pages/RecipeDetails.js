import React from 'react';
import { useParams } from "react-router-dom";
import useFetch from '../useFetch';  // Custom hook to fetch data

const RecipeDetails = () => {
    const { id } = useParams(); // Get the recipe ID from URL parameters
    const url = process.env.REACT_APP_API_URL + '/recipes/' + id; // Build API URL dynamically
    const { data: recipe, error, isLoading } = useFetch(url); // Fetch the recipe data

    return (
        <div className="recipe-details">
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {recipe && (
                <article>
                    <h2>{recipe.title}</h2>
                    <p className="author">Written by {recipe.userName}</p>
                    
                    {/* Display Image if imageFile exists */}
                    {recipe.imageFile && (
                        <img src={`http://localhost:8082/uploads/${recipe.imageFile}`} alt={recipe.title} />
                    )}

                    <h3>Ingredients:</h3>
                    {Array.isArray(recipe.ingredients) ? (
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No ingredients available</p>
                    )}

                    <h3>Instructions:</h3>
                    <p>{recipe.instructions}</p>
                    
                    <div className="tags">
                        <h3>Tags:</h3>
                        <p>{recipe.tags.join(', ')}</p>
                    </div>
                    <p className="publication-date">Published on: {new Date(recipe.publicationDate).toLocaleDateString()}</p>
                </article>
            )}
        </div>
    );
};

export default RecipeDetails;
