import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import "./SearchBar.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Hook to navigate to another route
  // useEffect(() => {
    const handleSearch = () => {
      if (searchTerm) {
        // Redirect to the search results page and pass the search term
        navigate(`/search-results?query=${searchTerm}`);
      } 
      // if (!searchTerm) {
      //   navigate(`/`);
      // }
    }
    // handleSearch()
  // }, [searchTerm])

    // New function to handle key down events
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };

  return (
    <div className="input-wrapper">
    <FaSearch id="search-icon" />
    <input
      placeholder="Type to search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      onKeyDown={handleKeyDown} // Add key down event handler
    />
    <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;