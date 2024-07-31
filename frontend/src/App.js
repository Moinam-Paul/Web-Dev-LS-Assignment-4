import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Components/Tweet Main Body/Header';
import Body from './Components/Tweet Main Body/Body';
import Login from "./Components/Authorization/Login";
import Signup from "./Components/Authorization/Signup";
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthenticated(!!token);
  }, []);

  console.log("Authenticated:", authenticated); // Check if authentication state is correct

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              authenticated ? (
                <>
                  <Header />
                  <Body />
                </>
              ) : (
                <p>Please log in to view tweets.</p>
              )
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;