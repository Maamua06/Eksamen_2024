import { useAuthContext } from './useAuthContext';
import { useQuotesContext } from './useQuotesContext'; 

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: dispatchQuotes } = useQuotesContext

    const logout = () => {
        // Remove user from local storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatch({ type: 'LOGOUT '});
        dispatchQuotes({ type: 'SET_QUOTES', payload: null }); 
    };

    return { logout };
}