import React, { useState } from 'react'
import styles from "../styles/Admin.module.css"

interface formData{
  name: string,
  price: string,
  description: string,
  quantity: number,
  image: string
}

const CreateProduct = () => {


  const [formData, setFormData] = useState<formData>({
    name: '',
    price: '',
    description: '',
    quantity: 0,
    image: ''
  })

  const handleChange = (e : any) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    })
  }

  const createProduct = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(formData.quantity < 1) return alert("quantity must be atleast 1")
   try{
    const res = await fetch("/api/product/create" , {
      method : 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json();
    if(data.success === false){ // if it encounter any error
      alert(data.message)
      return;
    }
    setFormData({
      name: '',
      price: '',
      description: '',
      quantity: 0,
      image: ''
     })
    alert("product created successfully")
    window.location.reload()
    
   } 
   catch(error){
    console.log(error)
   }
  console.log("form" , formData)
  }

  return (
    <div>
        <div className='container'>
        <div>
            <h1>Create a product</h1>
            <form className={styles.productForm} onSubmit={createProduct}>
                <input placeholder='Product Name' id='name' onChange={handleChange} type='text' value={formData.name}/>
                <input placeholder='Price' id='price' onChange={handleChange} type='number' value={formData.price}/>
                <textarea placeholder='Description' id='description' onChange={handleChange} value={formData.description}/>
                <input placeholder='Quantity' id='quantity' onChange={handleChange} type='number' value={formData.quantity}/>
                <input placeholder='url of the image' id='image' onChange={handleChange} type='text' value={formData.image}/>
                <button className={styles.loginBtn}>CREATE</button>
            </form>
        </div>
        </div>
    </div>
  )
}

export default CreateProduct