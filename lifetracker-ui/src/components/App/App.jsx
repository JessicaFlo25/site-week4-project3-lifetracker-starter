import React from 'react'
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import jwtDecode from "jwt-decode"
import Navbar from "../Navbar/Navbar"
import Landing from "../Landing/Landing"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import ActivityPage from "../ActivityPage/ActivityPage"
import NutritionPage from "../NutritionPage/NutritionPage"
import NotFound from '../NotFound/NotFound'
import  SleepPage from '../SleepPage/SleepPage'
import "./App.css"
import { ExercisePage } from '../ExercisePage/ExercisePage'



const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);//will need later to know when and not to display login/register buttons
  const [loginError, setLoginError] = useState("");
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState(null)

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        const decodedToken = await jwtDecode(token); 
        setUserName(decodedToken.userName)
        setUserID(decodedToken.userId)
        if (decodedToken.exp * 1000 > Date.now()) {
          setLoggedIn(true); 
        } else {
          handleLogout(); 
        }
      }
    };

    checkLoggedIn(); 
  }, [])


  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();


      // if (response.status == 401){
      //   console.log("error detected")
      //   console.log("response",data.error.message)
      //   setLoginError(data.error.message);
      // }


      if (response.status == 200) {

        const {token} = data
        localStorage.setItem("token",token)


        //Successful Login
        setLoggedIn(true);
        console.log(data.message); //optional - display a success message
        console.log(data.user.username)

        const decodedToken = jwtDecode(token)
        console.log(decodedToken)
        setUserID(decodedToken.userId)
        setUserName(decodedToken.Username)//fetching the username from the token
        return true
  
      } else {
        //Login failed
        setLoginError(data.message);
        console.log(data.message); //optional - display error message
        setUserName()
      }
    } catch (error) {
      console.error("Error:", error);
      return false
    }
  };

  //Registration function to handle registration
  const handleRegistration = async (username, password, first_name, last_name, email) => {
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password, first_name, last_name, email })
      });
      console.log(response)
      //name, email, password

      //wait for the response
      const data = await response.json();

      console.log(data)

      if (response.status == 201) {
        //got the token information and storing it in localStorage
        console.log("we get here")
        const {token} = data
        console.log("we don't get here")
        console.log("TOKEN IS ", token)
        localStorage.setItem("token",token)

        
        
       

    
        //Registration successful
        setLoggedIn(true);
        console.log(data.message); //optional - display a success message
        console.log(data.user.username)
        console.log(jwtDecode(token))
        const decodedToken = jwtDecode(token)
        console.log(decodedToken)
        setUserID(decodedToken.UserID)
        setUserName(decodedToken.Username) //optional - display a success message
        //returning because will facilitate usage of navigate
        return true
      } else {
        //Registration failed
        console.log(data.message); //optional - display error meesage
        return false
      }
    } catch (error) {
      console.log(error)
    }
  };

  

  const handleLogout = () => {
    localStorage.removeItem("token")
    setLoggedIn(false);
    setUserName("")

  };


  return (
    <div className='app'>
      <BrowserRouter>
      <Navbar loggedIn={loggedIn} onRegister={handleRegistration} handleLogout={handleLogout}/> 
      {/* above passes t/f and will affect what buttons appear */}
        <Routes>
          <Route path="/" element={<Landing/>}/> 
          <Route path="/login" element={<LoginPage onLogin={handleLogin} loginError={loginError} loggedIn = {loggedIn} />}/>
          <Route path="/register" element={<RegistrationPage onRegister={handleRegistration}/>} />  
          <Route path="/activity" element={<ActivityPage loggedIn={loggedIn} />}/>
          <Route path="/exercise" element={<ExercisePage loggedIn={loggedIn}/>}/>
          <Route path="/nutrition" element={<NutritionPage loggedIn={loggedIn} userID={userID} />}/>
          <Route path="/sleep" element={<SleepPage loggedIn={loggedIn} />}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      
      
      </BrowserRouter>
    </div>
  )
}

export default App