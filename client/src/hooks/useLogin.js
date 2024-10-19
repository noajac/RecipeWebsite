import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    // States for error and loading, initially set to null
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    // Accessing the dispatch function from the AuthContext using useAuthContext
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        // Set initial loading and error states
        setIsLoading(true);
        setError(null);

        // Validate input
        if (!email || !password) {
            setError('Email and password are required');
            setIsLoading(false);
            return;
        }

        try {
            // Making a login request
            const response = await fetch(process.env.REACT_APP_API_URL + '/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const json = await response.json();

            console.log('Response status:', response.status);
            console.log('Response JSON:', json);

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error || 'Failed to log in');
            } else {
                // Save the user to local storage as a JSON object
                localStorage.setItem('user', JSON.stringify(json));
                // Update the AuthContext
                dispatch({ type: 'LOGIN', payload: json });
                setIsLoading(false);
            }
        } catch (err) {
            setIsLoading(false);
            setError('Network error, please try again');
            console.error('Error during login:', err);
        }
    };

    return { login, isLoading, error };
};
