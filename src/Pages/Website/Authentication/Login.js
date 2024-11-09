
import { useContext, useState } from "react";
import axios from "axios";
import "./signup.css";
// import "./forms.css";
import { User } from "../Context/userContext";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setaccept] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const navigate=useNavigate()

  const userNow = useContext(User);
  const cookie=new Cookies()
  
  console.log(userNow);

  async function Submit(e) {
    e.preventDefault();
    setaccept(true);
    try {
      let res = await axios.post(`http://127.0.0.1:8000/api/login`, {
        email: email,
        password: password,
      }
    );
      const token = res.data.data.token;
      const usersinfo = res.data.data.user;
      userNow.setAuth({ token, usersinfo });
      cookie.set("token",token)
      navigate("/Home")
    } catch (err) {
      if (err.response.status === 401) {
        console.log(err.response.status);
        setEmailError(true);
                          }
      setaccept(true);
    }
  }

  return (
    <>
      <Header />
      <div className='father'>
        <form action='' onSubmit={Submit}>
          
          <label htmlFor='email'>email: </label>
          <input
            type='email'
            id='email'
            placeholder='email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
         
          <label htmlFor='password'>password: </label>
          <input
            type='password'
            id='password'
            placeholder='password...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {password.length < 8 && accept && (
            <p className='error'>password must be at least 8 character</p>
          )}
          <div style={{ textAlign: "center" }}>
            <button id='submit' type='submit'>
              Sign in
            </button>
          </div>
          {accept === true && emailError === true && (
            <p className='error errorlogin'>Wrong email or password,Try again </p>
          )}
        </form>
      </div>
    </>
  );
}
