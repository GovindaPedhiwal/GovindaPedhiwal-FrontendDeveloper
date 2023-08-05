import React from 'react'
import './footer.css'
import { FaHeart } from 'react-icons/fa'
const Footer = () => {
  return (
      <footer className="footer">
          <p className="text-center">Made with <FaHeart className="heart-icon"/> by Me!</p>
      </footer>
  )
}

export default Footer