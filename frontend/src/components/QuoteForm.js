import { useState } from "react"
import { useQuotesContext } from "../hooks/useQuotesContext"
import { useAuthContext } from '../hooks/useAuthContext'

const apiUrl = process.env.REACT_APP_API_URL;

const QuoteForm = () => {
    const {dispatch} = useQuotesContext();
    const { user } = useAuthContext();

    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);


    const handleSubmit = async (e) => {
        

        if(!user) {
            setError('You must be logged in')
            return
        }

        const response = await fetch(`${apiUrl}/api/quotes`, {
            method: 'POST',
            body: JSON.stringify({author, body}),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
          }
          if (response.ok) {
            setAuthor('')
            setBody('')
            setError(null)
            setEmptyFields([])
            dispatch({type: 'CREATE_BLOG', payload: json})
      
          }
    }

    return ( 
        <form className="FormBox" onSubmit={handleSubmit}>
        <h3>Add a New Quote</h3>
  
  
        <label>body:</label>
        <input 
          type="text"
          onChange={(e) => setBody(e.target.value)}
          value={body}
          className={emptyFields === 'body' ? 'error' : 'input'}
        />
  
        <label>Author:</label>
        <input 
          type="text"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
          className={emptyFields === 'author' ? 'error' : 'input'}
        />
        <button>Add Blog</button>
        {error && <div className="error">{error}</div>}
      </form>
     );
}
 
export default QuoteForm;