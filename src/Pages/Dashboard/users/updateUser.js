import { useContext, useEffect, useState } from "react";

import axios from "axios";
// import "./forms.css";
import { User } from "../../../Pages/Website/Context/userContext";

import { useNavigate } from "react-router-dom";

export default function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [accept, setaccept] = useState(false);
  const [emailError, setEmailError] = useState("");

  const id = Number(window.location.pathname.slice(17));
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/user/showbyid/${id}`,{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
      .then((data) => {
        setName(data.data[0].name);
        setEmail(data.data[0].email);
      });
  }, []);


  const userNow = useContext(User);
  const token = userNow.auth.token;
  console.log(userNow);
  const navigate = useNavigate();

  async function Submit(e) {
    e.preventDefault();
    setaccept(true);

    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/user/update/${id}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: repeat,
        },{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        }
        
      );
      const token = res.data.data.token;
      const usersinfo = res.data.data.user;
      userNow.setAuth({ token, usersinfo });
      navigate("/dashboard/users");

    } catch (err) {
      if (err.response.status === 422) {
        console.log(err.response.status);
        setEmailError(true);
      }
    }
    setaccept(true);
  }

  return (

    <div className='father' style={{ width: "100%",flexDirection:"column"}}>

      <h1 style={{ margin: "30px 0 0 30px" }}>Update User</h1>
      <form
        action=''
        onSubmit={Submit}
        style={{ width: "30%", outline: "none" }}
      >
        
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
            Update
          </button>
        </div>
      </form>
    </div>

  );
}
