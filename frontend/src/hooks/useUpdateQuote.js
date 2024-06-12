import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

export const useUpdateQuotes = () => {
    const {user} = useAuthContext();
    const [author, setAuthor] = useState('')
    const [body, setBody] = useState('');
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleClick = async (id, updatedQuote) => {
        setIsLoading(true);
        let data;
        try {
            const response = await fetch(`${apiUrl}/api/quotes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(updatedQuote),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update quote');
            }
    
            data = await response.json();
            setData(data);
            
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
        
        return data; // return the data
    };
    
    
    const returnval={ handleClick, data, isLoading, error, setAuthor, setBody }
    //console.log("step 1\n",returnval);
    return returnval; // add setAuthor and setBody to the return statement
};
