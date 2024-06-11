import { createContext, useReducer } from "react";

export const QuotesContext = createContext();

export const quotesReducer = (state, action) => {
    switch (action.payload) {
        case 'SET_QUOTES':
            return {
                quotes: action.payload
            }
        case 'CREATE_QUOTES': {
            return {
                quotes: [action.payload, ...state.quotes]
            }
        }
        case 'DELETE_QUOTE': {
            return {
                quotes: state.quotes.filter(w => w._id !== action.payload._id) 
            }
        }
        default:
            return state
    }
};

export const QuotesContextProvider = ( { children }) => {
    const [state, dispatch] = useReducer(quotesReducer, {
        quotes: []
    })

    return (
        <QuotesContext.Provider value={{ ...state, dispatch}}>
            {children}
        </QuotesContext.Provider>
    )
}