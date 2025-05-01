import React, { useContext } from 'react'
import './FoodCard.css'
import { assets } from '../../assets/assets'
import { ContextStorage } from '../../context/ContextStorage';

const FoodCard = ({itemId, name, price, description, image}) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(ContextStorage);
    // console.log(cartItems);

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img src={url+"/images/"+image} alt="" className='food-item-img'/>
            {
                !cartItems[itemId]
                ?<img src={assets.add_icon_white} onClick={() => addToCart(itemId)} className='add'/>
                :<div className='food-item-counter'>
                    <img onClick={() => removeFromCart(itemId)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[itemId]}</p>
                    <img onClick={() => addToCart(itemId)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-description">{description}</p>
            <p className="food-item-price">Rs {price}</p>
        </div>
    </div>
  )
}

export default FoodCard