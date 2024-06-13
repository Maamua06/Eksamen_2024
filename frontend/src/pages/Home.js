import React from 'react';
import { useLatestPosts } from '../hooks/useLatestPosts';
import QuoteForm from '../components/QuoteForm';
import UpdateQuoteForm from '../components/QuoteUpdate';
import styled from "styled-components";
import { useDeleteQuotes } from '../hooks/useDeleteQuotes';
import { useUpdateQuotes } from '../hooks/useUpdateQuote';

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

const DeleteButton = styled.span`
  background-color: #ff0000; /* Red background */
  color: #ffffff; /* White text */
  padding: 8px 16px; /* Padding around the button text */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Cursor style on hover */
  font-size: 16px; /* Font size */
  transition: background-color 0.3s ease; /* Smooth color transition on hover */
  background-color: #cc0000; /* Darker red on hover */
  margin-left: 85%;
`;

const UpdateButton = styled.span`
  background-color: #0848DD; /* Blue background */
  color: #ffffff; /* White text */
  padding: 8px 16px; /* Padding around the button text */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Cursor style on hover */
  font-size: 16px; /* Font size */
  transition: background-color 0.3s ease; /* Smooth color transition on hover */
  margin-left: 5%;
`;

const Home = () => {
    const { quotes, isLoading, error } = useLatestPosts();
    const { handleClick: handleDelete, data: deleteData } = useDeleteQuotes();
    const { handleClick: handleUpdate, data: updateData, setAuthor, setBody } = useUpdateQuotes(); // use the new hook
    const [editingQuote, setEditingQuote] = React.useState(null);

    // Add a function to handle the update button click
    const handleUpdateClick = (quote) => {
        setEditingQuote(quote);
    };

    return ( 
        <div className="home">
            {editingQuote ? (
                <UpdateQuoteForm quote={editingQuote} setEditingQuote={setEditingQuote} />
            ) : (
                <QuoteForm />
            )}
            <div className="blogs">
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {quotes && quotes.map(quote => (
                    <Box key={quote.id}>
                        <h4>{quote.author}</h4>
                        <BoxText>"{quote.body}"</BoxText>
                        <DeleteButton onClick={() => handleDelete(quote?._id)}>delete</DeleteButton>
                        <UpdateButton onClick={() => handleUpdateClick(quote)}>update</UpdateButton> {/* add the update button */}
                    </Box>
                ))}
            </div>
        </div>
    );
}

export default Home;
