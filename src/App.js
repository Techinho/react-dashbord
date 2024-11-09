import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Website/Authentication/SignUp";
import Login from "./Pages/Website/Authentication/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Website/Home";
import Users from "./Pages/Dashboard/users/users";
import Update from "./Pages/Dashboard/users/updateUser";
import CreateUser from "./Pages/Dashboard/users/createUser";
import RequiredAuth from "./Pages/Website/Authentication/requiredAuth";
import Persistlogin from "./Pages/Website/Authentication/persistlogin";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route element={<Persistlogin />}>
          <Route element={<RequiredAuth />}>
            <Route path='/Dashboard' element={<Dashboard />}>
              <Route exact path='users' element={<Users />} />
              <Route path='users/:id' element={<Update />} />
              <Route path='users/create' element={<CreateUser />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
