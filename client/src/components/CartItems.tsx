import React, { useEffect, useState } from 'react'
import styles from "../styles/Cart.module.css"

const CartItems = () => {
  
    const [items, setItems] = useState<any>()

    useEffect(() => {
     const fetchApi = async() => {
      try{
        const mail = localStorage.getItem("email")
        console.log("mail" , mail)
        const data = await fetch('/api/shopper/getCartItems', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json", // Might not be necessary for GET requests
            },
            body: JSON.stringify({ "email" : mail})
        });
        const res = await data.json();
        setItems(res) 
      }
      catch(error){
      console.log(error , "errr")
      }
     }
    fetchApi();
    },[])

    const removeFromCart = async(param : string) => {
        try{
            const mail = localStorage.getItem("email")
            console.log("mail" , mail)
            const data = await fetch('/api/shopper/removeFromCart', {
                method: 'DELETE',
                headers: {
                  "Content-Type": "application/json", // Might not be necessary for GET requests
                },
                body: JSON.stringify({ "email" : mail  , "productId" : param})
            });
            const res = await data.json();
            setItems(res?.shopper?.cartItems) 
            alert('Product removed from cart')
            window.location.reload()
          }
          catch(error){
            console.log(error , "errr")
        }
    }

    const proceedToCheckout = async() => {
        try{
            const mail = localStorage.getItem("email")
            const data = await fetch('/api/shopper/checkout', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json", // Might not be necessary for GET requests
                },
                body: JSON.stringify({ "email" : mail })
            });
            const res = await data.json();
            setItems(res?.shopper?.cartItems) 
            alert('Checkout successful')
            window.location.reload()
          }
          catch(error){
            console.log(error , "errr")
        }
    }
    
    console.log("check" , items)

  return (
    <div>
        <div className='container'>
            <div>
              <h1 style={{ textAlign: "center"}}>Cart Items</h1>
              {items?.cartItems && items?.cartItems?.length > 0 ? (
                items?.cartItems.map((ele : any) => (
                    <div className={styles.itemListLayout}>
                    <div className={styles.itemList} style={{ width: "100%"}}>
                        <p style={{ width: "50%"}}>{ele.name}</p>
                        <div style={{ display: "flex" , width: "50%" , flexDirection: "row" , justifyContent: "space-between"}}>
                          <p> &#x20B9; {ele.price}</p>
                          <button className={styles.deleteBtn} onClick={() => removeFromCart(ele.productId)}>Delete</button>
                        </div>
                    </div>
                  </div>
                  ))
              ) : (
                <p style={{ textAlign: "center" , fontSize: "24px" , marginTop: "32px"}}>No items in Cart</p>
              )}
             
             {items?.cartItems?.length > 0 &&
              <button className={styles.checkOut} onClick={proceedToCheckout}>Check out</button>
             }
            </div>
        </div>
    </div>
  )
}

export default CartItems