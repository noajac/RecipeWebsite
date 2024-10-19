// /src/pages/SearchResults.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchResultsList } from "../../components/SearchResultsList/SearchResultsList";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  // Extract search query from URL params
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      // Fetch recipes based on the search query
      fetch(process.env.REACT_APP_API_URL + `/recipes/?search_query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    }
  }, [query]);

  return (
    <div className="search-results-page">
      <h2>Search Results for: {query}</h2>
      <SearchResultsList results={results} />
    </div>
  );
};

export default SearchResults;
