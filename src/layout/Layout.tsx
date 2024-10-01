// Layout.jsx
import React, { useEffect } from "react";
import { Outlet, redirect } from "react-router-dom";
const Navbar = React.lazy(() => import("./Navbar"));
const SideBar = React.lazy(() => import("./Sidebar"));
import { Scrollbar } from "smooth-scrollbar-react";
import { setAccesToken } from "../api/axiosConfig";
import NewNotif from "./NewNotif";

type Props = {};

const Layout = (props: Props) => {

  const acct = localStorage.getItem("access_token");
  

  useEffect(() => {
    if (acct) {
      setAccesToken(acct)
    };

  },[acct] )

 

  return (
    <>
      <div className="appbg"></div>
      <div className="sideBar">
        <SideBar />
      </div>

      <div className="appcontainer">
        <div className="appContent" style={{ height: "100%" }}>
          <Outlet />
        </div>
      </div>

      <div className="appheader">
        <Navbar />
      </div>
      <NewNotif />
    </>
  );
};

export default Layout;
