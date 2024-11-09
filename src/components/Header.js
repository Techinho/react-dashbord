import { Link } from "react-router-dom";
import { User } from "../Pages/Website/Context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";


export default function Header() {
  const auth = useContext(User);
  const user = auth.auth.usersinfo;
  const cookie = new Cookies();
  const token = cookie.get("token");
  const navigate = useNavigate();

  async function handleLogout() {
   try { 
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cookie.remove("token");
    navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='nav'>
      <h1 className='logo'>Ezzaouya</h1>
      <div className='elements'>
        <Link to='/Home'> Home</Link>
        <Link to='/Services'>Services</Link>
        <Link to='/About'>About</Link>
        <Link to='/Contact'>Contact</Link>
      </div>

      <div className='navButtons'>
        {!user ? (
          <>
            <Link to='/login' className='navbtn'>
              Login
            </Link>
            <Link to='/register' className='navbtn'>
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to='/Dashboard' className='navbtn'>
              Dashboard
            </Link>
            <Link className='navbtn' onClick={handleLogout}>
              Logout
            </Link>
          </>
        )}
      </div>
    </div>
  );
    
  }
