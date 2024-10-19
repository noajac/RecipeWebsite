import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import Recipelist from '../../components/Recipelist';
import useFetch from '../../useFetch';

const url = process.env.REACT_APP_API_URL + '/recipes';

const HomePage = () => {
  const { user } = useAuthContext();

  const { error, isLoading, data: recipes } = useFetch(url);

  return (
    <div className={styles.home}>
      {/* Display error if any */}
      {error && <div>{error}</div>}
      {/* Display loading message while data is being fetched */}
      {isLoading && <div>Loading...</div>}
      {/* Display list of recipes once data is fetched */}
      {recipes && <Recipelist recipes={recipes} />}

      {/* If a user is logged in, show the 'Add Recipe' button */}
      {user && (
        <Link to="/RecipeForm" className={styles.addRecipeButton}>
          Add Recipe
        </Link>
      )}
    </div>
  );
};

export default HomePage;
