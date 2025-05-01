import React from 'react'
import { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Explore from '../../components/Explore/Explore'
import DisplayFood from '../../components/DisplayFood/DisplayFood'
import DownloadApp from '../../components/DownloadApp/DownloadApp'

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
        <Header/>
        <Explore category={category} setCategory={setCategory}/>
        <DisplayFood category={category}/>
        <DownloadApp/>
    </div>
  )
}

export default Home
