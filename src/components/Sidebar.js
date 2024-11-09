import { Link } from "react-router-dom";
export default function Sidebar() {

  return (
    <div className='Sidebar'>
      <Link to='/Dashboard/Users' className="item-link">
      <i class="fa-solid fa-users" style={{marginRight:"10px"}}></i>Users</Link>
      <Link to='/Dashboard/Users/Create' className="item-link">
      <i class="fa-solid fa-user-plus" style={{marginRight:"10px"}}></i>Create User</Link>
    </div>
  );
}
