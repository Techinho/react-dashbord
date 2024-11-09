import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { User } from "../../Website/Context/userContext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [change, setChange] = useState(0);
  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, [change]);

  async function deleteUser(id) {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUsers((prev) => prev.filter((item) => item.id === !id));
        setChange((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const showUsers = users.map((user, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <Link to={`${user.id}`}>
            <i class='fa-solid fa-pen'></i>
          </Link>
          <i
            onClick={() => deleteUser(user.id)}
            class='fa-solid fa-trash'
            style={{ color: "red", marginLeft: "20px", cursor: "pointer" }}
          ></i>
        </td>
      </tr>
    );
  });
  return (
    <div className='users'>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
    </div>
  );
}
