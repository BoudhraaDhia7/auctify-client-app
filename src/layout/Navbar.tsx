// Navbar.jsx
import React, { useEffect, useState, useRef } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { GrNotification } from "react-icons/gr";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo } from "../reducers/currentUserSLice";
import { PICT_URL } from "../api/axiosConfig";
import { AiOutlineFileSearch, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { resetGlobalSearch, setGlobalSearch, setIsAddProduct } from "../reducers/globalSlice";
import HeaderAlerts from "./HeaderAlerts";
import { AnimatePresence } from "framer-motion";
import { newAppNotif } from "../utils/helpers";
type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const curUser = useSelector(
    (state: any) => state?.currentUser?.user?.currentUser
  );
  const global = useSelector((state: any) => state.global);
  const location = useLocation();

  const [isListVisible, setIsListVisible] = useState(false);
  const [ withSearch, setWithSearch] = useState<boolean>(false);
  const [ isSearch, setIsSearch] = useState<boolean>(false);
  const [ addProd, setAddProd] = useState<boolean>(false);

  const [ isAlert, setIsAlert] = useState<boolean>(false);

  const userId = localStorage.getItem("userID");
  const logout = () => {
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("roleID");
    navigate("/login");
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inp = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (location.pathname === "/usersList") { setWithSearch(true); setAddProd(false) }
    if (location.pathname === "/Dashboard") { setWithSearch(false); setAddProd(false)  }
    if (location.pathname === "/companiesList") { setWithSearch(true); setAddProd(false)  }
    if (location.pathname === "/productsList") { setWithSearch(true); setAddProd(false)  }
    if (location.pathname.includes("/parametres")) { setWithSearch(false); setAddProd(false)  }
    if (location.pathname.includes("/statistiques")) { setWithSearch(false); setAddProd(false)  }
    if (location.pathname.includes("/profile")) { setWithSearch(false); setAddProd(false)  }
    if (location.pathname.includes("/displayUserInfos")) { setWithSearch(false); setAddProd(false)  }
    if (location.pathname.includes("/displayCompanyInfos")) { setWithSearch(false); setAddProd(false)  }
    if (location.pathname.includes("/displayCompanyProducts")) { setWithSearch(false); setAddProd(true) }
    if (location.pathname.includes("/productinfo")) { setWithSearch(false); setAddProd(false) }
    
  }, [location.pathname])

  useEffect(() => {
    if (userId) {dispatch(fetchUserInfo(userId));}
    console.log("loaded")
  },[] )

  useEffect(() => {
    if (userId) {dispatch(fetchUserInfo(userId));}
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, userId]);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsListVisible(false);
    }
  };

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  const setSearchTerm = (t :string) => {
    dispatch(setGlobalSearch(t));
  }

  function generateImgUrl(filePath: string) {

    if(filePath.includes("http")) return filePath;
    return `${PICT_URL}${filePath}`;
  }

  return (
    <nav className="bg-opacity-100">
      <div className="headerContainer">
        <div className="sectionTitle flex flex-row gap-x-6 items-center">
          <div className="sectionTitle">
            {(location.pathname === "/usersList") || location.pathname.includes("/displayUserInfos")
              ? "Utilisateurs"
              : (location.pathname === "/companiesList" || location.pathname.includes("/displayCompanyInfos"))
              ? "Partenaires"
              : (location.pathname === "/productsList" || location.pathname.includes("/productinfo"))
              ? "Produits"
              : location.pathname === "/statistics"
              ? "Statistique"
              : location.pathname.includes("/parametres")
              ? "Paramètres"
              : location.pathname.includes("/live")
              ? "Live"
              : location.pathname.includes("/displayCompanyProducts")
              ? "Produits"
              : location.pathname.includes("/profile")
              ? "Profile"
              : location.pathname.includes("/statistiques")
              ? "Statistiques"
              : location.pathname.includes("/Dashboard")
              ? "Dashboard"
              : "Dashboard"}
          </div>
          {(withSearch) && <div 
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              placeholder="Search"
              ref={inp}
              value={global.globalSearch}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "250px",
                height: "42px",
                fontFamily: "Montserrat",
                fontWeight: "500",
                fontSize: "12px",
                color: "#000",
                paddingLeft: "30px",
                border: "1px solid #ccc",
                borderRadius: "7px",
              }}
            />
            <AiOutlineSearch
              size={20}
              style={{
                position: "absolute",
                top: "50%",
                left: "7px",
                width: "18px",
                height: "18px",
                transform: "translateY(-50%)",
              }}
            />
          </div>}
          
          { addProd && <div className="nav-add-prod" onClick={() => dispatch(setIsAddProduct(true))}>
            <AiOutlinePlus size={20} color="#FFF" />
            <div className="nav-add-prod-text">AJOUTER UN PRODUIT</div>
          </div>}

        </div>

        <div></div>

        <div className="flex justify-center items-center">
          <div onClick={() => setIsAlert(true)} className="header-notif-container">
            <GrNotification size={20} className="mr-4" />
            <div className="header-notif-value">{ newAppNotif(global.appNotifications) }</div>
          </div>
          <div>
            {curUser?.role !== 1 ? (
              <img
                src="https://ui-avatars.com/api/?name=a+d&color=fff&background=445e97"
                alt=""
                className="rounded-full border border-gray-100 shadow-sm mr-4 bg-purple-500 "
                height="40"
                width="40"
              />
            ) : (
              <img
                src={generateImgUrl(curUser?.logo)} 
                alt=""
                className="rounded-full border border-gray-100 shadow-sm mr-4 "
                height="40"
                width="40"
              />
            )}
          </div>
          <div className="relative" ref={dropdownRef}>
            <IoEllipsisVerticalSharp onClick={toggleListVisibility} />
            {isListVisible && (
              <div className="absolute right-0 top-full mt-4">
                <ul className="bg-white rounded-lg shadow-md border border-gray-300">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link to={{ pathname: `/profile/${curUser?._id}` }}>
                      Profile
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <button onClick={logout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        { isAlert && <HeaderAlerts closeNotifs={() => setIsAlert(false)} />}
      </AnimatePresence>

    </nav>
  );
};

export default React.memo(Navbar);
