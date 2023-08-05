import React from 'react'
import space from '../../assets/images/spacex.svg'
import './header.css'

const Header = () => {
  return (
      <div className="header">
          <div className="logo">
            <img src={space} alt="spacex logo"></img>
          </div>
      </div>
  )
}

export default Header