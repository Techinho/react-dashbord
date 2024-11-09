import { useContext } from "react"
import { User } from "../Context/userContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"

/**
 * A component that checks if the user is authenticated.
 * If the user is authenticated, it renders the child components.
 * If the user is not authenticated, it redirects to the login page.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 * 
 * 
 */

export default function RequiredAuth() {
    const user =useContext(User)
    const location=useLocation()
return (
user.auth.usersinfo?<Outlet/>:<Navigate state={{from:location}} to="/login"/>
)
}