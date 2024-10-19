import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'; 
import HomePage from './pages/HomePage/HomePage'; 
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from './pages/SearchResults/SearchResults'; // Import new SearchResults component
import RecipeDetails from './pages/RecipeDetails'; 
import RecipeForm from './pages/UploadRecipe/RecipeForm'; 
import Login from './pages/login'; 
import Signup from './pages/signup'; 
import Navbar from './components/Navbar'; 
import { useLogout } from './hooks/useLogout'; 
import { useAuthContext } from './hooks/useAuthContext'; 
import styles from './styles/App.module.css'; 

function App() {
  const { logout } = useLogout(); 
  const { user } = useAuthContext();
  
  const handleClick = () => {
    logout(); 
  };

  const renderAuthRoute = (Component) => {
    return user ? <Navigate to="/" /> : <Component />;
  };

  return (
    <Router> 
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <Navbar /> 
          <nav className={styles.appNav}>
            {!user && (
              <div>
                <Link to="/login" className={styles.appLink}>Log in</Link>
                <Link to="/signup" className={styles.appLink}>Sign up</Link>
              </div>
            )}
            {user && (
              <div className={styles.userSection}>
                <span>{user.email}</span>
                <button onClick={handleClick} className={styles.logoutButton}>Log out</button>
              </div>
            )}
          </nav>
          
          {/* <div className={styles.searchBarContainer}> */}
          <SearchBar className={styles.searchBarContainer}/>
          {/* </div> */}
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/RecipeForm" element={user ? <RecipeForm /> : <Navigate to="/login" />} />
            <Route path="/login" element={renderAuthRoute(Login)} />
            <Route path="/signup" element={renderAuthRoute(Signup)} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 
