import React from 'react'
import "./NutritionCard.css"

const NutritionCard = ({data}) => {
  return (
    <div>
      <div className='nutrition-card'>
        <img src = {data.image_url}/>
        <p className='names'>Name: {data.name}</p>
        <p className='categories'>Category: {data.category}</p>
        <p className='calories'>Calories: {data.calories}</p>
        <p className='times'>Time added: {data.created_at}</p>
        </div>
    </div>
  )
}

export default NutritionCard