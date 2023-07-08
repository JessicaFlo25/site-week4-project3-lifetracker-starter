
import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const NutritionPage = ({loggedIn, userID}) => {
//assuming this will also only display if the user is logged in,need to use logged in usestate
//if they are not display LOG IN TO SEE DATA,else display the form
//develop form with all inputs,name,calories,image,cat
//button,with text save,onclick creates new nutrition entry, similar to register

const navigate = useNavigate()

const [nutrition_name,setNutritionName] = useState("")
const [calories,setCalories] = useState(1)
const [imageURL,setImageUrl] = useState("")
const [category,setCategory] = useState("") //category that this nutrition item belongs to, like fruit, meat, soda, snack, nuts, etc. 

const handleAddNutrition = async (name, calories, image_url, category, user_id) => {
  try{
    const response = await fetch("http://localhost:3001/nutrition/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,category, calories,image_url, user_id })

    });
  }catch(err){
    next(err)
  }
}


  return (
    <div>
      {loggedIn ? (
        <div className='form-container'>
          <form  onSubmit={() => handleAddNutrition (nutrition_name,calories,imageURL, category, userID)}className='nutrition-form'>
            <input
              className='nutrition'
              type="text"
              value={nutrition_name}
              onChange={(e) => setNutritionName(e.target.value)}
              required
              placeholder="Nutrition Name"
            />
            <input
            className='calories'
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)} //dropdown
            />
            <input
            className='image_url'
            type="text"
            value={imageURL}
            onChange={(e) => setImageUrl(e.target.value)}
            
            />
            <input 
            className='category'
            type="text"
            value={category}
            />

            <button  type="submit" className='submit-bttn'>Save</button>
            
          </form>
          
        </div>

      ) : (<h1 className='Log-in'>Log in to see your data</h1>)}




    </div>
  )
}

export default NutritionPage
