import React from 'react'
import "./SleepPage.css"

const SleepPage = ({loggedIn}) => {
  return (
    <div className='nothing-container'>
      {loggedIn ? (<div className='inner-container-nothing'>
            <p className='nothing-here'>Nothing Here Yet</p>
            <img src='https://i.pinimg.com/564x/9c/30/ee/9c30ee21de509f516cea3f883b537b10.jpg' alt='moon image'/>
        </div>
          ) : (<p className='sleep-login'>Log in to see your data </p>)}        
    </div>
  )
}

export default SleepPage