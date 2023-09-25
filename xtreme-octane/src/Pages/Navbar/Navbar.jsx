import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import "../../Styles/styles.css";
import logo from "../../Images/Logo_transparent.png";
import { Link, useLocation } from "react-router-dom";

function Navbar({ toggleSidebar }) {
	const [sidebar, setSidebar] = useState(false);
	const location = useLocation();
	const API = window.appConfig.API;
	const email = sessionStorage.getItem("Email");
	const memberId = sessionStorage.getItem("MemberId");

	const handleToggleSidebar = () => {
		setSidebar(!sidebar);
		toggleSidebar();
	};

	const loggedInUser = {
		name: email,
	};

	useEffect(() => {
		if (!email) {
			setSidebar(false);
		}
	}, [email]);

	return (
		<>
			<IconContext.Provider value={{ color: "#fff" }}>
				<div className="navbar">
					{email && (
						<Link to="#" className="menu-bars" onClick={handleToggleSidebar}>
							{sidebar ? <AiIcons.AiOutlineClose /> : <FaIcons.FaBars />}
						</Link>
					)}
					<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
						<ul className="nav-menu-items">
							{email && (
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
					{email && (
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
