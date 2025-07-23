import React from 'react'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import CreateAnimal from './features/animals/CreateAnimal'
import UpdateAnimal from './features/animals/UpdateAnimal'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/create" element={<CreateAnimal />} />
          <Route path="/update/:id" element={<UpdateAnimal />} />
          <Route path="/gallery/create" element={<CreateAnimal />} />
          <Route path="*" element={<div className="container mx-auto pt-20 text-center">Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App