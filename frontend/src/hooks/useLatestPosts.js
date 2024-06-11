import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

const apiUrl = process.env.REACT_APP_API_URL;

export const useLatestPosts = () => {
    const { user } = useAuthContext(); 
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [quotes, setQuotes] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(true); // Boolean flag to control fetching

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

        // Allow fetching again after 1 minute
        setTimeout(() => {
            setShouldFetch(true);
        }, 60000); // 1 minute in milliseconds
    };

    useEffect(() => {
        // Fetch only if shouldFetch flag is true
        if (shouldFetch) {
            latestPosts();
            setShouldFetch(false); // Prevent further fetching until next timeout
        }
    }, [shouldFetch]); // Fetch whenever shouldFetch changes

    useEffect(() => {
        // Fetch once immediately when the component mounts
        latestPosts();

        // Fetch again every 1 minute
        const interval = setInterval(() => {
            setShouldFetch(true);
        }, 60000); // 1 minute in milliseconds

        // Cleanup the interval to avoid memory leaks
        return () => clearInterval(interval);
    }, []); // Fetch once on mount

    return { quotes, isLoading, error };
};
