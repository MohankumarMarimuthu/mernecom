import styles from "../styles/Header.module.css"
import logo from "../assets/logo.svg"
import { Link, useNavigate } from "react-router-dom"
import { MdLogout } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { RiAdminFill } from "react-icons/ri";


const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const currentPath = location.pathname;

    console.log("cu" , currentPath.includes('admin'))

    const Logout = () => {
      currentPath.includes("user") ? localStorage.removeItem("email") : localStorage.removeItem("admin")
      navigate("/")
    }

  return (
    <header>
        <div style={{ backgroundColor: "black"}}>
            <div className="container">
                <div className={styles.headerItems}>
                  <Link to={currentPath.includes("user") ? "/user" : ""}>
                  <img src={logo} alt="" className={styles.logoImg}/>
                  </Link>
                  {window.innerWidth > 767 &&
                    <p>GtCart</p>
                  }
                  <div style={{ gap: ""}}>
                    {currentPath === "/admin" ? (
                        <RiAdminFill className={styles.logoCart}/>
                    ) : (
                    <Link to="/user/cart">
                      <IoCartOutline className={styles.logoCart}/>
                    </Link>
                    )}
                  
                  <span onClick={Logout}>
                    <MdLogout className={styles.logOut}/>
                  </span>
                  </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header