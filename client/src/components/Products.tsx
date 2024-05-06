import { useEffect, useState } from 'react'
import styles from "../styles/Products.module.css";

const Products = () => {

  const [products, setProducts] = useState<any>()
  const [searchedTerm, setSearchedTerm] = useState("")

  useEffect(() => {
    if(searchedTerm.length > 2){
      const fetchItems = products.filter((item : any) => {
        return item?.name.toLowerCase().includes(searchedTerm.toString().toLowerCase()) 
      });
      setProducts(fetchItems)  
    }
    else if (searchedTerm.length === 0){
      const fetchApi = async() => {
        try{
          const data = await fetch('/api/product/getAllProducts')
          const res = await data.json();
          const temp = res.map((item : any) => ({ ...item, reqQuantity: 1 }));
          // console.log("first" , res)
          setProducts(temp) 
        }
        catch(error){
          console.log(error , "errr")
        }
      }
      fetchApi();
    }
  },[searchedTerm])

  const decrementItemCount = (id : string) => {
    const updatedProducts = products.map((product: any) => {
      if (product._id === id) {
        const temp = product.reqQuantity > 1 ? product.reqQuantity - 1 : 1;
        return { ...product, reqQuantity: temp };
      }
      return product;
    });
    setProducts(updatedProducts);
  }

  const incrementItemCount = (quantity : number , id : string) => {
    const updatedProducts = products.map((product: any) => {
      if (product._id === id) {
        const temp = product.reqQuantity === quantity ? quantity : product.reqQuantity  + 1;
        return { ...product, reqQuantity: temp };
      }
      return product;
    });
    setProducts(updatedProducts);
  }

  // console.log("pro" , products)

  const sendAddToCart = async(param: any) => {
    try{
      const email = localStorage.getItem("email")
      const res = await fetch('/api/shopper/addToCart' , {
        method : 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": email,
          "productId": param._id,
          "quantity": param.reqQuantity
        })
      })
      const data = await res.json();
      if(data.success === false){ // if it encounter any error
        alert(data.message)
        return;
      }
      alert('item added to cart successfully')
      window.location.reload();
     } 
     catch(error){
      console.log(error)
     }
  }

  return (
    <section>
        <div className='container'>
          <div style={{ display: "flex" , justifyContent: "center" , marginTop: "24px"}}>
            <input placeholder='search products ...' 
            className={styles.inputSearch} onChange={(e : any) => setSearchedTerm(e.target.value) }/>
          </div>
          <div className={styles.itemBoxLayout}>
            {products && products.filter((item: any) => item.quantity > 0 ).map((item : any) => (
            <div className={styles.itemBox} key={item._id}>  {/* box overal */}
              <div>
               <img src={item.imageUrls} alt='Product' className={styles.productImg}/>
              </div>
              <div>
               <div style={{ display: "flex" , justifyContent: "space-between"}}>
                 <p>{item.name}</p>
                 <p>&#x20B9;{item.price}</p>
               </div>
               <p>{item.description.substring(0, 70)}...</p>
               <div style={{ display: "flex", cursor: "pointer" , alignItems: "center" , justifyContent: "space-between"}}>
                 <div style={{ display: "flex" , gap: "20px" }}>
                   <span onClick={() => decrementItemCount(item._id)}>-</span>
                   <span>{item.reqQuantity}</span>
                   <span onClick={() => incrementItemCount(item.quantity , item._id)}>+</span>
                 </div>
                  <button className={styles.cartBtn} onClick={() => sendAddToCart(item)}>Add to cart</button>
               </div>
               <p>Quantity: {item.quantity}</p>
              </div>
           </div>
            ))}
            
          </div>
        </div>
    </section>
  )
}

export default Products