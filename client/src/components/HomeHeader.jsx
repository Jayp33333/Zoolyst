import React from 'react'
import { Link } from 'react-router-dom'
const HomeHeader = () => {
  return (
      <nav className='nav-wrapper'>
        <div className="nav-logo">
          <Link to="/">Zootopia</Link>
        </div>
        <div className="nav-link">
          <Link to="/gallery">Gallery</Link>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
  )
}

export default HomeHeader