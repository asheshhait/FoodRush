import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {
  const[catagory,setCatagory] = useState("All")
  return (
    <div>
      <Header/>
      <ExploreMenu catagory={catagory} setCatagory = {setCatagory}/>
      <FoodDisplay catagory={catagory}/>
      <AppDownload/>
    </div>
  )
}

export default Home