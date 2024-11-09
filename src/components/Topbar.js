import { Link } from "react-router-dom";
export default function TopBar() {
  return (
    <div className="nav"  style={{justifyContent:"space-between",  position:"static"}}>
     
        <h1 className="logo" style={{color:"white",marginLeft:"40px" }}  >Dashboard</h1>
      
        <Link to='/Home' className='navbtn' style={{marginRight:"30px" }} >
            Go to website
          </Link>
    </div>
  );
}
