import TopBar from "../../components/Topbar";
import { Routes, Route, Router, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
export default function Dashboard() {
  return (
    <div>
      <TopBar />
      <div className='DashContent'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
