import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css"
import React, { useState } from "react";

interface loginFormData{
  email: string;
  password: string;
}

const Login = () => {
  
  const [formData, setFormData] = useState<loginFormData>({
    email: "",
    password: ""
  })
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // console.log("currentPath" , currentPath)


  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    })
  }
  
  const loginSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   try{
    const res = await fetch(`/api/auth${currentPath}` , {
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
    currentPath === "/user/login"  ? localStorage.setItem("email" , formData?.email) : localStorage.setItem("admin" , formData?.email)
    navigate(currentPath === "/admin/login" ? "/admin" : "/user")
   } 
   catch(error){
    console.log(error)
   }
  }
  
  
  return (
    <div>
        <div >
            <form className={styles.loginForm} onSubmit={loginSubmit}>
            <h1 style={{ textAlign: "center"}}>{currentPath === "/user/login" ? "User Login" : "Admin Login"}</h1>
                <input placeholder="Email" id="email" type="email" onChange={handleChange}/>
                <input placeholder="Password" id="password" type="password" onChange={handleChange}/>
                <button className={styles.loginBtn}>login</button>
            </form>
        </div>
    </div>
  )
}

export default Login