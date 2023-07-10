import React from 'react'

const NutritionCard = ({data}) => {
  return (
    <div>
        <img src = {data.image_url}/>
        <p>Name: {data.name}</p>
        <p>Category: {data.category}</p>
        <p>Calories: {data.calories}</p>
        <p>Time added: {data.created_at}</p>
    </div>
  )
}

export default NutritionCard