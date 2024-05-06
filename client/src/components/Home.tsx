import { Link } from 'react-router-dom'
import styles from "../styles/Home.module.css"
 

const Home = () => {
  return (
    <div>
        <div className={styles.loginSelection}> 
            <Link to="/user/login">User Login</Link>
            <Link to="/admin/login">Admin Login</Link>
        </div>
    </div>
  )
}

export default Home