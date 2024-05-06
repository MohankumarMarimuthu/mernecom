import React from 'react'
import Header from '../components/Header'
import CartItems from '../components/CartItems'

const Cart = () => {
  return (
    <div>
      <div style={{  background: "#e3e3e3" , minHeight: "100vh" , height: "100%" , paddingBottom: "100px"}}>
        <Header />
        <CartItems />
      </div>
    </div>
  )
}

export default Cart