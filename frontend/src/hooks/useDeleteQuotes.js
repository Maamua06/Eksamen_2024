import { useState } from "react";
import { useAuthContext} from "./useAuthContext";

// import from env
const apiUrl = process.env.REACT_APP_API_URL;

export const useDeleteQuotes = () => {

    const {user} = useAuthContext()
    const [data, setData] = useState(null);

    const handleClick = async (id) => {
        const response = await fetch(`${apiUrl}/api/quotes/` + id, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${user.token}`}
        })

        const json = await response.json()

        if(response.ok) {
            setData(json)
        }
    }

    return { handleClick, data}
}