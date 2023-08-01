import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import "./Navbar.css";
import logo from "../../Images/Logo_transparent.png";
import { Link, useLocation } from "react-router-dom";

function Navbar({ toggleSidebar }) {
	const [sidebar, setSidebar] = useState(true);
	const location = useLocation();

	const handleToggleSidebar = () => {
		setSidebar(!sidebar);
		toggleSidebar();
	};

	return (
		<>
			<IconContext.Provider value={{ color: "#fff" }}>
				<div className="navbar">
					<Link to="#" className="menu-bars" onClick={handleToggleSidebar}>
						<FaIcons.FaBars />
					</Link>
					<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
						<ul className="nav-menu-items">
							<li className="navbar-toggle">
								<Link
									to="#"
									className="menu-bars"
									onClick={handleToggleSidebar}
								>
									<AiIcons.AiOutlineClose />
								</Link>
							</li>
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
				</div>{" "}
			</IconContext.Provider>
		</>
	);
}

export default Navbar;
