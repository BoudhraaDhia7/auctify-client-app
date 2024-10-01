// Sidebar.jsx
import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import {
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineDatabase,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineFolderAdd,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const Sidebar = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const curUser = useSelector(
    (state: any) => state?.currentUser?.user?.currentUser
  );
  const access_role = localStorage.getItem("roleID");
  console.log("curUser", curUser);
  const [accessRole, setAccessRole] = useState<string | null>(null);
  useEffect(() => {
    const roleID = localStorage.getItem("roleID");
    setAccessRole(roleID);
  }, []);

  return (
    <div className="flex flex-col h-full ">
      <div className="basis-[%] mb-3 flex items-center justify-center">
        <img
          alt="logo"
          src={logo}
          className="object-contain  cursor-pointer hover:scale-150 scale-150 duration-300 w-100"
          style={{ width: "150px" }}
        />
      </div>

      <div className="flex flex-col grow rounded-xl items-center justify-start gap-6 sideBarColor">
        <Link
          to={"/Dashboard"}
          className="flex flex-col items-center justify-arround text-white hover:scale-105 duration-500 ease-in-out"
        >
          <RxDashboard className="text-md font-bold " />
          <p className="sideMenuItem">Dashboard</p>
        </Link>
        {access_role == "2" && (
          <>
            <Link
              to={"/usersList"}
              className="flex flex-col items-center justify-arround text-white hover:scale-105 duration-500 ease-in-out"
            >
              <AiOutlineUser className="text-md font-bold " />
              <p className="sideMenuItem">Utilisateurs</p>
            </Link>
            <Link
              to={"/companiesList"}
              className="flex flex-col items-center justify-arround text-white hover:scale-105 duration-500 ease-in-out"
            >
              <AiOutlineUsergroupAdd className="text-md font-bold " />
              <p className="sideMenuItem">Partenaires</p>
            </Link>
            <Link
              to={"/productsList"}
              className="flex flex-col items-center justify-arround text-white hover:scale-105 duration-500 ease-in-out"
            >
              <AiOutlineDatabase className="text-md font-bold " />
              <p className="sideMenuItem">Produits</p>
            </Link>
            <Link
              to={"/statistiques"}
              className="flex flex-col items-center justify-arround text-white hover:scale-105 duration-500 ease-in-out"
            >
              <AiOutlineBarChart className="text-md font-bold " />
              <p className="sideMenuItem">Statistiques</p>
            </Link>
            <Link
              to={"/live"}
              className="flex flex-col items-center justify-arround text-white hover:scale-105 duration-500 ease-in-out"
            >
              <AiOutlineUser className="text-md font-bold " />
              <p className="sideMenuItem">Live</p>
            </Link>
          </>
        )}
        {access_role == "1" && (
          
          <>
            <Link
              to={"/displayCompanyProducts"}
              className="flex flex-col items-center justify-arround text-white hover:scale-105 duration-500 ease-in-out"
            >
              <AiOutlineDatabase className="text-md font-bold " />
              <p className="sideMenuItem">Products</p>
            </Link>

           
            <Link
              to={"/liveCompany"}
              className="flex flex-col items-center justify-arround text-white hover:scale-105 duration-500 ease-in-out"
            >
              <AiOutlineUser className="text-md font-bold " />
              <p className="sideMenuItem">Live</p>
            </Link>
          </>
        )}
        <Link
          to={{ pathname: `/parametres/${curUser?._id}` }}
          className="flex flex-col items-center justify-arround text-white hover:scale-105 duration-500 ease-in-out"
        >
          <AiOutlineSetting className="text-md font-bold " />
          <p className="sideMenuItem">Paramètres</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
