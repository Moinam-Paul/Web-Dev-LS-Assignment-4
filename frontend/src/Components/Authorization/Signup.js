import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import "./Signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // To display signup errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/users/", { username, password }); // Ensure this matches your backend
      if (response.status === 201) { // Assuming 201 is the response status for successful signup
        navigate("/login");
      }
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error("Signup failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
