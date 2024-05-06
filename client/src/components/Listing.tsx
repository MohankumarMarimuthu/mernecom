import React, { useEffect, useState } from 'react'
import styles from "../styles/Products.module.css"

const Listing = () => {

  const [products, setProducts] = useState<any>()

  useEffect(() => {
    const fetchApi = async() => {
      try{
        const data = await fetch('/api/product/getAllProducts')
        const res = await data.json();
        setProducts(res) 
      }
      catch(error){
        console.log(error , "errr")
      }
    }

    fetchApi();
  },[])

  const deleteItems = async(id : string) => {
    try{
      const data = await fetch('/api/product/delete' , {
        method : 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "id" : id})
      })
      const res = await data.json();
      if(res.success === false){ // if it encounter any error
        alert(res.message)
        return;
      }
      alert('product delted successfully!')
      window.location.reload()
    }
    catch(error){
      console.log(error , "errr")
    }
  }

  return (
    <div style={{ width: "300px" , overflow: "scroll"}}>
        <h1>List of all products</h1>
        {products && products.map((item:any) =>  (
          <div className='' style={{ display: "flex" , justifyContent: "space-between" , marginTop: "20px"}} key={item._id}>
            <p>{item.name}</p>
            <button className={styles.deleteBtn} onClick={() => deleteItems(item._id)}>Delete</button>
          </div>
        ))}
    </div>
  )
}

export default Listing