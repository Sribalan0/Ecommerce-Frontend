import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import bgImage from '../assets/loginbg.jpg'; // Adjust the path accordingly



function Login() {
  const [credentials, setCredentials] = useState({ gmail: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/login", credentials);
      alert(`Welcome, ${response.data.gmail}`);
      
      // Navigate to Home page on successful login
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${bgImage})` }}>

      <div className="login-box">
     
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="gmail"
            placeholder="Enter email address"
            value={credentials.gmail}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>

  );
}

export default Login;
