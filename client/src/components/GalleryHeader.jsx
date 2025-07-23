import React from 'react'
import { Link } from 'react-router-dom'
const GalleryHeader = () => {
  return (
      <nav className='nav-wrapper'>
        <div className="nav-logo">
          <Link to="/">Zootopia</Link>
        </div>
        <div className="nav-link">
          <Link to="/gallery">Gallery</Link>
        </div>
      </nav>
  )
}

export default GalleryHeader