import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();
    const navigate = useNavigate();

    const redirect = () => {
        navigate('/home/:user');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(username, password, redirect)
    }

    return (
        <form className="FormBox login" onSubmit={handleSubmit}>
            <h3 className="FormTitle">Log in</h3>

            <label className="FormLabel">Username:</label>
            <input
                type='username'
                className="FormInput"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <label className="FormLabel">Password:</label>
            <input
                type="password"
                className="FormInput"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button className="FormButton" disabled={isLoading}>Log in</button>
            {error && <div className="FormError">{error}</div>}
        </form>
    )
}

export default Login