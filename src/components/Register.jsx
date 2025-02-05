import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './App.css';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();  // Initialize navigate hook

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return;
        }

        // Simulating successful signup
        alert(`Account created successfully for ${email}`);


        // Redirect to login page after signup
        navigate('/login');
    };

    return (
        <div className="login-container" style={{ backgroundImage: 'url(${bgImage})' }}>
            <div className="login-box">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                <div className="links">
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;