import React from 'react'
import "./ActivityPage.css"

const ActivityPage = ({loggedIn}) => {
  return (
    <div>
      {loggedIn ? (<div className='activity'>
        <p className='activity-txt'>Nothing Here Yet</p>
        <img className='bar-graph' src='https://media.istockphoto.com/id/1305911616/vector/statistics-icon-for-web-and-mobile.jpg?s=612x612&w=0&k=20&c=HEA-qjcxXK5VKzlBd0Rmb7du8OJaMoIB7XIMY3KI68g=' alt="image of bar graph"/>
      </div>
        ) : (<p className='activity-login'>Log in to see your data</p>)}
    </div>
  )
}

export default ActivityPage