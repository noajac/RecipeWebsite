import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    // states for error and loading. initially set to null
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    // accessing the dispatch function from the AuthContext using useAuthContext
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        // set initial loading and error states
        setIsLoading(true)
        setError(null)

        // making a login request
        const response = await fetch(process.env.REACT_APP_API_URL +'/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage as a json object 
            localStorage.setItem('user', JSON.stringify(json))
            //update the AuthContext
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)


        }
    }
    return { signup, isLoading, error }
}