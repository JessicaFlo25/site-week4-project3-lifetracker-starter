import React from 'react'
import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Landing from "../Landing/Landing"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import ActivityPage from "../ActivityPage/ActivityPage"
import NutritionPage from "../NutritionPage/NutritionPage"
import NotFound from '../NotFound/NotFound'
import "./App.css"



const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);//will need later to know when and not to display login/register buttons
  const [loginError, setLoginError] = useState("");
  const [userName, setUserName] = useState();


  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        //Successful Login
        setLoggedIn(true);
        setLoginError("");
        console.log(data.message); //optional - display a success message
      } else {
        //Login failed
        setLoginError(data.message);
        console.log(data.message); //optional - display error message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Registration function to handle registration
  const handleRegistration = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      //wait for the response
      const data = await response.json();

      if (response.ok) {
        //Registration successful
        setLoggedIn(true);
        console.log(data.message); //optional - display a success message
      } else {
        //Registration failed
        console.log(data.message); //optional - display error meesage
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };


  return (
    <div className='app'>
      <BrowserRouter>
      <Navbar loggedIn={loggedIn}/> 
      {/* above passes t/f and will affect what buttons appear */}
        <Routes>
          <Route path="/" element={<Landing/>}/> 
          <Route path="/login" element={<LoginPage onLogin={handleLogin} error={loginError} />}/>
          <Route path="/register" element={<RegistrationPage/>}/>  
          {/* conditional rendering, need to figure out a conditional using a state and make sure wildcard is last conditional */}
          <Route path="/activity" element={<ActivityPage />}/>
          <Route path="/nutrtion/*" element={<NutritionPage />}/>
          <Route path="*" element={<NotFound/>}/>
          
        </Routes>
      
      
      </BrowserRouter>
    </div>
  )
}

export default App