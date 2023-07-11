import React from 'react'
import "./ExercisePage.css"

export const ExercisePage = ({loggedIn}) => {
  return (
    <div className='exercise-container-outer'>
      {loggedIn ? (        <div className='exercise-page'>
            <p className='exercise-text'>Nothing Here Yet</p>
            <img className='exercise-img' src='https://media.istockphoto.com/id/1152386793/vector/athlete-powerlifter-squat-with-barbell.jpg?s=612x612&w=0&k=20&c=Hv-8AzUkppESv_3X4rDIsE1rx8V5rYJgGtArKuyA3Ts=' alt='exercise image'/>
        </div>
) : (<p className='exercise-login'>Log in to see your data</p>)}
    </div>
  )
}
