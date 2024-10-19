import { useState, useEffect } from 'react'; // Import React hooks for managing state and side effects

// Custom hook for fetching data from a given URL
const useFetch = (url) => {
  // State to store fetched data, initialized to null
  const [data, setData] = useState(null);
  // State to track if the fetch request is pending, initialized to true
  const [isPending, setIsPending] = useState(true);
  // State to store any error message that occurs during fetch
  const [error, setError] = useState(null);

  // useEffect hook to perform side effects, in this case, fetching data
  useEffect(() => {
    // Create a new AbortController instance to allow aborting fetch requests
    const abortCont = new AbortController();
    
    // Set a timeout to simulate network delay (optional, not usually needed)
    setTimeout(() => {
      // Perform the fetch request to the provided URL
      fetch(url, { signal: abortCont.signal }) // Attach the AbortController's signal
        .then(res => {
          // Check if the response is not OK (status code outside of 200-299)
          if (!res.ok) {
            console.log(url); // Log the URL for debugging
            throw Error('could not fetch the data for that resource'); // Throw an error to be caught later
          }
          // Parse the response as JSON and return it
          return res.json();
        })
        .then(data => {
          // Update state with the fetched data
          setIsPending(false); // Set loading state to false since the data has been fetched
          setData(data); // Store the fetched data
          setError(null); // Clear any previous error
        })
        .catch(err => {
          // Handle any errors that occur during the fetch
          if (err.name === 'AbortError') {
            console.log('fetch aborted'); // Log if the fetch was aborted
          } else {
            // For other errors, update the error state
            setIsPending(false); // Set loading state to false
            setError(err.message); // Store the error message
          }
        });
    }, 0); // Set a delay of 0 milliseconds (immediate execution)

    // Cleanup function to abort the fetch request if the component unmounts or URL changes
    return () => abortCont.abort();
  }, [url]); // Dependency array - effect runs when 'url' changes

  // Return the data, loading state, and error message for use in components
  return { data, isPending, error };
}

export default useFetch; // Export the custom hook for use in other components
