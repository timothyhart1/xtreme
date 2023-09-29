import axios from "axios";
import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useEmail } from "../../Contexts/EmailContext";
import { useMemberId } from "../../Contexts/MemberIdContext";
import logo from "../../Images/Logo_transparent.png";

function Navbar({ toggleSidebar }) {
	const [sidebar, setSidebar] = useState(false);
	const location = useLocation();
	const API = window.appConfig.API;
	const { email } = useEmail();
	const { memberId } = useMemberId();
	const userId = sessionStorage.getItem("UserId");
	const [userRole, setUserRole] = useState("");
	const token = sessionStorage.getItem("Token");

	const handleToggleSidebar = () => {
		setSidebar(!sidebar);
		toggleSidebar();
	};

	const loggedInUser = {
		name: email,
	};

	useEffect(() => {
		if (!token) {
			setSidebar(false);
		}
	}, [token]);

	useEffect(() => {
		async function getUserRole() {
			try {
				const res = await axios.get(`${API}/User/GetUserRole/${userId}`);
				setUserRole(res.data);
			} catch (error) {
				console.error(error);
			}
		}
		getUserRole();
	}, [API]);

	const SidebarData = [
		{
			title: "Dashboard",
			path: "/",
			cName: "nav-text",
			roles: ["Admin"],
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
									<li
										key={index}
										className={isActive ? "nav-text active" : "nav-text"}
									>
										<Link to={item.path}>
											<span>{item.title}</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
					{token && (
						<div className="logged-in-as">
							<span style={{ color: "#fff", marginRight: "15px" }}>
								Logged In As: {loggedInUser.name}
							</span>
							<span>
								<img
									src={`${API}/Member/GetProfilePicture/${memberId}`}
									style={{
										width: "50px",
										height: "40px",
										borderRadius: "100%",
										objectFit: "cover",
									}}
								/>
							</span>
						</div>
					)}
				</div>
			</IconContext.Provider>
		</>
	);
}

export default Navbar;
