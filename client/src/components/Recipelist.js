import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Recipelist.module.css';
import logo from '../royalHeadline.jpeg'; // Adjust the path as needed

const Recipelist = (props) => {
    const recipes = props.recipes;

    return (
        <div className={styles["recipe-list-container"]}>
            <div className={styles["logo-container"]}>
                <img src={logo} alt="The Royal Cookbook" className={styles.logo} />
            </div>
            <div className={styles["recipe-list"]}>
                {recipes.map((recipe) => (
                    <div className={styles["recipe-preview"]} key={recipe._id}>
                        <Link to={`/recipes/${recipe._id}`}>
                            <img
                                src={`http://localhost:8082/uploads/${recipe.imageFile}`}
                                alt={recipe.title}
                                className={styles["recipe-image"]}
                            />
                            <h3>{recipe.title}</h3>
                            <p>Written by {recipe.userName}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recipelist;
