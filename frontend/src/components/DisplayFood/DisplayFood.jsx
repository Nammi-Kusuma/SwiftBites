import React, { useContext } from 'react'
import './DisplayFood.css'
import { ContextStorage } from '../../context/ContextStorage'
import FoodCard from '../FoodCard/FoodCard'

const DisplayFood = ({category}) => {
  const { food_list } = useContext(ContextStorage)
  return (
    <div className='display-food' id="display-food">
      <h2>Top Dishes near you!!</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if(category==="All" || category===item.category) {
            return <FoodCard key={index} itemId={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
          }
        })}
      </div>
    </div>
  )
}

export default DisplayFood