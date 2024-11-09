import { useContext, useState } from "react";
import axios from "axios";
import "./signup.css";
// import "./forms.css";
import { User } from "../Context/userContext";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [accept, setaccept] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const navigate = useNavigate();

  const userNow = useContext(User);
  console.log(userNow);

  const cookie = new Cookies();

  async function Submit(e) {
    e.preventDefault();
    setaccept(true);
    try {
      let res = await axios.post(`http://127.0.0.1:8000/api/register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: repeat,
      });
      const token = res.data.data.token;
      cookie.set("token", token);
      const usersinfo = res.data.data.user;
      userNow.setAuth({ token, usersinfo });
      navigate("/dashboard");
    } catch (err) {
      if (err.response.status === 422) {
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
          <label htmlFor='name'>name: </label>
          <input
            type='text'
            id='name'
            placeholder='name...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          {name === "" && accept && <p className='error'>name is required</p>}
          <label htmlFor='email'>email: </label>
          <input
            type='email'
            id='email'
            placeholder='email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {accept === true && emailError === 422 && (
            <p className='error'>Email already been taken</p>
          )}
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
          <label htmlFor='repeat'>confirm Password: </label>
          <input
            type='password'
            id='repeat'
            placeholder='confirm Passord...'
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
          ></input>
          {repeat !== password && accept && (
            <p className='error'>password dosent match</p>
          )}
          <div style={{ textAlign: "center" }}>
            <button id='submit' type='submit'>
              SignUp
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
