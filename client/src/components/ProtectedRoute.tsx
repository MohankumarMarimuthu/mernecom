import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {

    const currentUser = localStorage.getItem("email")
    const isAdmin = localStorage.getItem("admin")
    console.log("currentUser" , currentUser , isAdmin)
  
    // Check if currentUser is set and isAdmin is not set
    if (currentUser && !isAdmin) {
        return <Outlet />;
    }

    // Check if isAdmin is set and currentUser is not set
    if (isAdmin && !currentUser) {
        return <Outlet />;
    }

    // Redirect to the login page if neither currentUser nor isAdmin is set
    return <Navigate  to={"/"} />;
}

export default ProtectedRoute

