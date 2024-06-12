import { useEffect, useState } from "react";
import { useUpdateQuotes } from '../hooks/useUpdateQuote';

const UpdateQuoteForm = ({ quote, setEditingQuote }) => {
    const { handleClick: handleUpdate, data: updateData } = useUpdateQuotes();

    const [body, setBody] = useState(quote.body);
    const [author, setAuthor] = useState(quote.author);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    useEffect(() => {
        if(updateData) {
            setEditingQuote(null)
        }
    }, [updateData])


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!quote?._id) {
            setError('Quote ID is missing.');
            return;
        }
    
        // Pass the updated body and author to the handleUpdate function
        const response = await handleUpdate(quote._id, { body, author });
        console.log('response', response);
    
        if (!response) {
            setError('No response from update function.');
            setEmptyFields(response.emptyFields)
            return;
        }
    
        if (!response.ok) {
            setError(response.error);
        } else {
            setAuthor('');
            setBody('');
            setEmptyFields([])
            setError(null);
            setEditingQuote(null); // Add this line
        }
    }
    

    return (
        <form className="FormBox" onSubmit={handleSubmit}>
            <label>
                Body:
                <input 
                    type="text"
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                    className={emptyFields === 'body' ? 'error' : 'input'}
                />
            </label>
            <label>
                Author:
                <input 
                    type="text"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                    className={emptyFields === 'body' ? 'error' : 'input'}
                />
            </label>
            <button type="submit">Update Quote</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default UpdateQuoteForm;
