import Header from '../components/Header'
import CreateProduct from '../components/CreateProduct'
import Listing from '../components/Listing'
import Orders from '../components/Orders'

const Admin = () => {
  return (
  <div className=''>
    <div style={{  background: "#e3e3e3" , minHeight: "100vh" , height: "100%" , paddingBottom: "100px" }}>
        <Header />
        <div className='container'>
        <div style={{ display: "flex" ,  justifyContent: "space-between"}}>
          <CreateProduct />
          <Listing />
        </div>
        <Orders />
        </div>
    </div>
  </div>  
  )
}

export default Admin