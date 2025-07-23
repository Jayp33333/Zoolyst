import React from 'react'
import { Link } from 'react-router-dom'
import HomeHeader from '../components/HomeHeader'
const Home = () => {
  return (
    <>
      <HomeHeader />
      <div className="home-container">
        <h1>Welcome to Zootopia</h1>
        <p>Your one-stop destination for all things animal-related!</p>
      </div>
    </>
  )
}

export default Home