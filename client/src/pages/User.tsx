import React from 'react'
import Header from '../components/Header'
import Products from '../components/Products'

const User = () => {
  return (
    <div style={{  background: "#e3e3e3" , minHeight: "100vh" , height: "100%" , paddingBottom: "100px"}}>
        <Header />
        <Products />
    </div>
  )
}

export default User