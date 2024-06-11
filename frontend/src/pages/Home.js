import { useEffect, useCallback } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

// components
import styled from "styled-components";
import QuoteForm from '../components/QuoteForm';

import { useLatestPosts } from '../hooks/useLatestPosts';

// Styled components
const Box = styled.div`
border: 2px solid #333;
padding: 20px;
margin: 20px auto;
background-color: #f0f0f0;
border-radius: 8px;
max-width: 600px; /* Set the maximum width to 120 characters */
word-wrap: break-word; /* Wrap words if they exceed the container width */
`;

const BoxText = styled.p`
font-size: 16px;
`;





const Home = () => {
    const { user } = useAuthContext();

    const { latestPosts, quotes, isLoading, error} = useLatestPosts()
    

    // Memoize the latestPosts function to prevent unnecessary re-renders
    const fecthLatestPosts = useCallback(() => {
        if(user){
            latestPosts();
        }
    },[user, latestPosts])

    useEffect(() => {
        fecthLatestPosts();
    },[user, fecthLatestPosts])

    useEffect(() =>{
         console.log(quotes)
    },[quotes])

    return ( 
        <>
        <div className="home">
            <QuoteForm></QuoteForm>
            <div className="blogs">
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                { quotes !== null && quotes.map((quote) =>(
                    <Box>
                        <h4>{quote?.author}</h4>
                        <BoxText>"{quote?.body}"</BoxText>
                    </Box>
                ))}
            </div>
        </div>

        </>
     );
}
 
export default Home;