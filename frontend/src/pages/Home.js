import React from 'react';
import { useLatestPosts } from '../hooks/useLatestPosts';
import QuoteForm from '../components/QuoteForm';
import styled from "styled-components";

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
    const { quotes, isLoading, error } = useLatestPosts();

    return ( 
        <div className="home">
            <QuoteForm />
            <div className="blogs">
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {quotes && quotes.map(quote => (
                    <Box key={quote.id}>
                        <h4>{quote.author}</h4>
                        <BoxText>"{quote.body}"</BoxText>
                    </Box>
                ))}
            </div>
        </div>
    );
}

export default Home;
