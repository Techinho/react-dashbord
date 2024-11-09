import { useState ,createContext } from "react";

export const color=createContext(null)
export const User =createContext({})

/** 
 * UserProvider component that provides authentication context to its children.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components that will receive the context.
 * @returns {JSX.Element} The UserProvider component with context.
 */
export default function UserProvider({children}) {
    const [auth,setAuth]=useState({})
    return (
        <User.Provider value={{auth,setAuth}}>
            {children}
        </User.Provider>
    )
}
