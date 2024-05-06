import React, { useEffect, useState } from 'react'

const Orders = () => {

  const [todayOrders , setTodayOrders] = useState<any>()

  useEffect(() => {
    const fetchApi = async() => {
      try{
        const data = await fetch('/api/product/todayOrders')
        const res = await data.json();
        setTodayOrders(res) 
      }
      catch(error){
        console.log(error , "errr")
      }
    }

    fetchApi();

  },[])

  console.log("todayOrders" , todayOrders)
  return (
    <div>
        <div style={{ marginTop: "80px"}}>
          <h1>Today's orders</h1>
          {todayOrders?.orders[0]?.orderedItems && todayOrders?.orders[0]?.orderedItems?.length > 0 ? (
           todayOrders?.orders[0]?.orderedItems.map((ele: any) => (
            <div>
              <div style={{ display: "flex" , justifyContent: "space-between" , border: "1px solid black" , 
            padding: "20px" , marginBottom: "24px" , borderRadius: "8px" }}>
                <p>{ele.name}</p>  
                <p>{ele.quantity}</p>  
              </div> 
            </div>
           ))
          ) : (
            <p>No order has been maded today</p>
          )}
        </div>
    </div>
  )
}

export default Orders