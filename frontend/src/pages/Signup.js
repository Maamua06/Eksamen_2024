import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirmation password
    const [passwordError, setPasswordError] = useState(null); // State to store password mismatch error
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        // Clear any previous password mismatch error
        setPasswordError(null);

        // Attempt to sign up the user
        await signup(username, password);

        // Clear form fields
        setPassword('');
        setConfirmPassword(''); // Clear confirmPassword field
        setUsername('');
    }

    return (
        <form className="FormBox signup" onSubmit={handleSubmit}>
            <h3 className="FormTitle">Sign Up</h3>

            <label className="FormLabel">Username:</label>
            <input
                type="text"
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

            <label className="FormLabel">Confirm Password:</label>
            <input
                type="password"
                className="FormInput"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
            />
            
            {passwordError && <div className="FormError">{passwordError}</div>} {/* Display password mismatch error */}
            {error && <div className="FormError">{error}</div>} {/* Display other errors */}

            <button className="FormButton" disabled={isLoading}>Sign up</button>


        </form>
    );
}

export default Signup;
