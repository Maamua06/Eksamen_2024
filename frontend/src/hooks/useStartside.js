import { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export const useStartSide = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [quotes, setQuotes] = useState(null);

    const startSide = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}/api/quotes/random`);
            const text = await response.text();

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Check if the response text is empty
            if (!text) {
                throw new Error('No Posts found');
            }

            let json;
            try {
                json = JSON.parse(text);
            } catch (e) {
                throw new Error('Error parsing JSON');
            }

            // Handle the parsed JSON
            if (Array.isArray(json)) {
                setQuotes(json);
            } else {
                setQuotes([json]);
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Log quotes after they have been updated
    useEffect(() => {
        console.log("Quotes:", quotes);
    }, [quotes]);

    return { startSide, quotes, isLoading, error };
};
