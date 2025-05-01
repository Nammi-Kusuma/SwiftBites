import React from 'react'
import './Explore.css'
import { menu_list } from '../../assets/assets'

const Explore = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our Menu</h1>
        <p className='explore-text'>Hungry for something delicious? Explore our menu and discover a variety of flavors crafted to satisfy every craving!</p>
        <div className="explore-menu-list">
            {
                menu_list.map((item, index) => {
                    return (
                        <div onClick={() => setCategory(prev => prev===item.menu_name?"All":item.menu_name)} key={index} className="menu-list-item">
                            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })
            }
        </div>
        <hr />
    </div>
  )
}

export default Explore