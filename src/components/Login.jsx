import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Login.css';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
//import { FaLock,FaEnvelope } from "react-icons/fa";
import bgImage from '../assets/Flipkart1bgk.jpeg';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successAlert, setSuccessAlert] = useState(false);  // Success state
    const [errorAlert, setErrorAlert] = useState(false);      // Error state
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'Usmanbarith04@gmail.com' && password === 'Usman') {
            setSuccessAlert(true);  
            setErrorAlert(false);   
            
            // Redirect to all products after 2 seconds
            setTimeout(() => {
                navigate('/Home');
              // navigate('/search');
            }, 5000);  
        } else {
            setErrorAlert(true);    
            setSuccessAlert(false); 
        }
    };

    return (
        <div className="login-container" style={{ backgroundImage: 'url(${bgImage})' }}>
            <div className="login-box">
                <h1>Welcome To Flipkart</h1>
                <h2>Login</h2>

                {/* Success Alert */}
                {successAlert && (
                    <Alert severity="success" onClose={() => setSuccessAlert(false)}>
                        <AlertTitle>Success</AlertTitle>
                        You have successfully logged in — <strong>Flipkart page...</strong>
                    </Alert>
                )}

                {/* Error Alert */}
                {errorAlert && (
                    <Alert severity="error" onClose={() => setErrorAlert(false)}>
                        <AlertTitle>Error</AlertTitle>
                        Invalid Gmail or Password — <strong>Please try again!</strong>
                    </Alert>
                )}

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
                      
                    <button type="submit">Login</button>
                </form>
                
                <div className="links">
                    <a href="/">Forgot Password?</a>
                    <Link to="/signup"></Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;