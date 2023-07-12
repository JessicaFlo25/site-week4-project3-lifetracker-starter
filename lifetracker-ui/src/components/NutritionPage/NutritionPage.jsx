import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import "./NutritionPage.css"
import NutritionCard from '../NutritionCard/NutritionCard'

const NutritionPage = ({loggedIn, userID}) => {
//object for new item from form, array for already existing data
const [addedItem, setAddedItem] = useState({})
const [existingItems, setExistingItems] = useState([])

//navigation tool
const navigate = useNavigate()

//just fetches all entries from that specific user
const getExistingItems = async () => {
  try {
  const response = await axios.get(`https://lifetracker-jessica.onrender.com/nutrition/${userID}`)
  setExistingItems(response.data.nutrition)

  console.log(existingItems)
  } catch(err) {
    console.error("Error: ", err)
  }
}

useEffect(() => {
  getExistingItems()
}, [userID])

//control the addition of each nutrition entry
//first add info each time while keeping previously added info in the database
//then we reset our usestate variable so that something new can be added each time
//it also prevents adding items more than once
//then we call get existing Items which will hold all previous added entries
//using the http request get
const handleAddNutrition = async (e) => {
  e.preventDefault()
  try{
    const response = await axios.post('https://lifetracker-jessica.onrender.com/nutrition/create', {
      ...addedItem,
      user_id: userID
    })
    setAddedItem({
      name: "",
      calories: "",
      category: "",
      image_url:""
    })
    
    getExistingItems()
    }catch(err){
      next(err)
  }
};

//will add to object will keeping previous added information
const handleInputChange = (e) => {
  const {name, value } = e.target
  setAddedItem((prevNutrition) => ({ ...prevNutrition, [name]: value }))
}




  return (
    <div>
      {loggedIn ? (
        <div className='form-container'>
          <form  onSubmit={handleAddNutrition}className='nutrition-form'>
            <input
              className='nutrition'
              name = "name"
              type="text"
              value={addedItem.name}
              onChange={handleInputChange}
              required
              placeholder="Nutrition Name"
            />
            <input 
            className='category'
            name="category"
            type="text"
            value={addedItem.category}
            placeholder='Enter category Eg:snack'
            onChange={handleInputChange}
            />

            <input
            className='calories'
            name ="calories"
            type="number"
            value={addedItem.calories}
            placeholder='Enter number of calories'
            onChange={handleInputChange} 
            />
            <input
            className='image_url'
            name='image_url'
            type="text"
            value={addedItem.image_url}
            placeholder='Desired Image URL'
            onChange={handleInputChange}
            />

            <button  type="submit" className='save-bttn'>Save</button>
            
          </form>

          {existingItems.map((data) => (
            (<NutritionCard data = {data}/>)
          ))}
          
        </div>

      ) : (<div className='log-container'><p className='Log-in'>Log in to see your data</p></div>)}




    </div>
  )
}

export default NutritionPage
