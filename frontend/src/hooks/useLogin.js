import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

const apiUrl = process.env.REACT_APP_API_URL;


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username, password, onSuccess) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${apiUrl}/api/user/sign-in`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok) {
            //Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the authContext
            dispatch({type: 'LOGIN', payload: json})

            // Call onSuccess callback to trigger redirect after successful login
            onSuccess()

            // update loading state
            setIsLoading(false)
        }
    }

    return { login, isLoading, error}
}