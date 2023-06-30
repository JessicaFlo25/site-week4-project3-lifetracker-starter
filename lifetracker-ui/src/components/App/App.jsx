import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Home from "../Home/Home"
import Navbar from "../Navbar/Navbar"
// import Register from "../Register/Register"
// import Login from "../Login/Login"
// import Portal from "../Portal/Portal"
import './App.css'


function App() {
  const[appState,setAppState] = useState({})

  return (
    <div className='app'>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          {/* <Route path="/" element={<Home />}/> */}
          {/* <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/> */}
          {/* display the components conditionally */}
        </Routes>
      </BrowserRouter>




    </div>
  )
}

export default App
