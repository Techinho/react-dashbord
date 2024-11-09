import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "../Context/userContext";
import Loader from "../../../components/loading";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

export default function PersistLogin() {
  const context = useContext(User);
  const token = context.auth.token;
  const [loading, setLoading] = useState(true);
  const cookie = new Cookies();
  const getCookie = cookie.get("token");

  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post(
            "http://127.0.0.1:8000/api/refresh",
            {},
            {
              headers: {
                Authorization: `Bearer ${getCookie}`,
              },
            }
          )

          .then((data) => {
            cookie.set("token", data.data.token);
            context.setAuth(()=>{
              return {
                usersinfo: data.data.user,
                token: data.data.token,
              }
            
            });
            console.log(data.data.token);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    !token ? refresh() : setLoading(false);
  }, []);

  return <div>{loading ? <Loader /> : <Outlet />}</div>;
}
