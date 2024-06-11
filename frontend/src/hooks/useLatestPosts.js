import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const apiUrl = process.env.REACT_APP_API_URL;

export const useLatestPosts = () => {
    const { user } = useAuthContext(); 
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [quotes, setQuotes] = useState([]);

    const latestPosts = async () => {
        setIsLoading(true);
        setError(null);

        if (user !== null) {
            const response = await fetch(`${apiUrl}/api/quotes/${user.username}`);
            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error);
            } else {
                const quotesArray = json.quotes;

                if (Array.isArray(quotesArray)) {
                    setQuotes(quotesArray);
                } else {
                    console.error("API response is not an array:", json);
                }
                setIsLoading(false);
                console.log("Quotes:", quotesArray);
            }
        } else {
            console.log('user is null');
            setError("User object is null.");
            setIsLoading(false);
        }
    };

    return { latestPosts, quotes, isLoading, error };
};
