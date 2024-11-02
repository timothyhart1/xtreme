import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { getMemberEmail } from "../../Contexts/UserSession";
import { getMemberId } from "../../Contexts/UserSession";
import { useUserRole } from "../../Contexts/RoleContext";
import logo from "../../Images/Logo_transparent.png";
import { useAuth } from "../Auth/Auth";

function Navbar({ toggleSidebar }) {
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();
  const API = window.appConfig.API;
  const email = getMemberEmail();
  const memberId = getMemberId();
  const { userRole } = useUserRole();
  const token = sessionStorage.getItem("Token");
  const auth = useAuth();
  const [userImage, setUserImage] = useState("");
  const [loadingImage, setLoadingImage] = useState(true); // New state to track image loading

  useEffect(() => {
    // Function to load image and update state
    const loadImage = async () => {
      const imageUrl = `${API}/Member/GetProfilePicture/${memberId}`;
      try {
        const response = await fetch(imageUrl);
        if (response.ok) {
          setUserImage(imageUrl);
        }
      } catch (error) {
        console.error("Failed to load user image:", error);
      } finally {
        setLoadingImage(false);
      }
    };

    if (memberId) {
      setLoadingImage(true);
      loadImage();
    }
  }, [API, memberId]); // Depend on API and memberId to re-run the effect

  const handleToggleSidebar = () => {
    setSidebar(!sidebar);
    toggleSidebar();
  };

  const loggedInUser = {
    name: email,
  };

  const logOutUser = () => {
    auth.logout();
  };

  useEffect(() => {
    if (!token) {
      setSidebar(false);
    }
  }, [token]);

  const SidebarData = [
    {
      title: "Dashboard",
      path: "/",
      cName: "nav-text",
      roles: ["Admin", "User"],
    },
    {
      title: "Members",
      path: "/members",
      cName: "nav-text",
      roles: ["Admin"],
    },
    {
      title: "Vehicles",
      path: "/vehicles",
      cName: "nav-text",
      roles: ["Admin"],
    },
    {
      title: "Events",
      path: "/events",
      cName: "nav-text",
      roles: ["Admin"],
    },
    {
      title: "Scribante",
      path: "/scribante",
      cName: "nav-text",
      roles: ["Admin", "User"],
    },
    {
      title: "View Events",
      path: "/view-events",
      cName: "nav-text",
      roles: ["Admin", "User"],
    },
    {
      title: "Edit Profile",
      path: "/edit-profile",
      cName: "nav-text",
      roles: ["Admin", "User"],
    },
    {
      title: "My Vehicles",
      path: "/member-vehicles",
      cName: "nav-text",
      roles: ["Admin", "User"],
    },
    {
      title: "Verify Members",
      path: "/verify-members",
      cName: "nav-text",
      roles: ["Admin"],
    },
    {
      title: "Edit Member Roles",
      path: "/edit-member-role",
      cName: "nav-text",
      roles: ["Admin"],
    },
  ];

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          {token && (
            <Link to="#" className="menu-bars" onClick={handleToggleSidebar}>
              {sidebar ? <AiIcons.AiOutlineClose /> : <FaIcons.FaBars />}
            </Link>
          )}
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items">
              {token && (
                <li className="navbar-toggle">
                  <Link
                    to="#"
                    className="menu-bars"
                    onClick={handleToggleSidebar}
                  >
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
              )}
              <div className="logo-container">
                <img src={logo} alt="" className="xtreme-octane-logo" />
              </div>
              {SidebarData.map((item, index) => {
                const isAllowed = item.roles
                  ? item.roles.includes(userRole)
                  : true;

                const isActive = item.path === location.pathname;

                return (
                  isAllowed && (
                    <li
                      key={index}
                      className={isActive ? "nav-text active" : "nav-text"}
                    >
                      <Link to={item.path}>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  )
                );
              })}
            </ul>
          </nav>
          {token && (
            <div className="logged-in-as">
              <span
                onClick={() => logOutUser()}
                style={{
                  color: "yellow",
                  marginRight: "15px",
                  cursor: "pointer",
                }}
              >
                Log Out
              </span>
              <span style={{ color: "#fff", marginRight: "15px" }}>
                Logged In As: {loggedInUser.name}
              </span>
            </div>
          )}
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
