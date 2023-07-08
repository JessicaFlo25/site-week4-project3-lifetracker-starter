import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

const Navbar = ({loggedIn, handleLogout}) => {
  return (
    <div>
        <nav className='Navbar'>
            <ul className='listedthings'>
            <li>
                <Link to="/">
                    <img className='logo' src="https://live.staticflickr.com/1262/536422340_93e740dc28_c.jpg" alt='logo'/>
                </Link>
            </li>
            <li>
                <Link to="/activity"><p>Activity</p></Link>
            </li>
            <li>
                <Link to="/exercise"><p>Exercise</p></Link>
            </li>
            <li>
                <Link to="/nutrition"><p>Nutrition</p></Link>
            </li>
            <li>
                <Link to="/sleep"><p>Sleep</p></Link>
            </li>
            </ul>
            {
                loggedIn ? (
                    <ul>
                    <button className='SignOutBttn' onClick = {handleLogout}>Sign Out</button>
                     </ul>
                ): (
                    <ul>
                        <li className='buttons'>
                            <Link to="/login">
                            <button className="Loginbttn">Login</button>
                            </Link>
                            <Link to="/register">
                            <button className='Registerbttn'>Register</button>
                            </Link>
                        </li>
                    </ul>
                )
            }

        </nav>
    </div>
)}

export default Navbar
//                         
