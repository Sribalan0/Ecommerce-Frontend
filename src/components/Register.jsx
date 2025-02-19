import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import bgImage from "../assets/login.avif";

function Register() {
  const [user, setUser] = useState({ gmail: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/register", user);

      if (response.data === "User already exists") {
        alert("User already exists. Please login.");
      } else {
        alert("User registered successfully!");
        navigate("/login");
      }
    } catch (error) {
      alert("Registration failed: " + (error.response?.data || "Please try again later."));
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="gmail"
            placeholder="Enter Gmail"
            value={user.gmail}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        <div className="links">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
