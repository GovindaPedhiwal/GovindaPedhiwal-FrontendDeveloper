import React from 'react'
import Banner from './components/banner/Banner'
import Header from './components/header/Header'
import './App.css'
import RocketsList from './components/rocketslist/RocketsList'
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <div>
      <Header />
      <Banner />
      <RocketsList />
      <Footer />
    </div>
  )
}

export default App