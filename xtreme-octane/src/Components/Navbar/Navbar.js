import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import "./Navbar.css";
import logo from "../../Images/Logo_light_transparent.png";

function Navbar({ toggleSidebar }) {
	const [sidebar, setSidebar] = useState(true);

	const handleToggleSidebar = () => {
		setSidebar(!sidebar);
		toggleSidebar();
	};

	return (
		<>
			<IconContext.Provider value={{ color: "undefined" }}>
				<div className="navbar">
					<Link to="#" className="menu-bars" onClick={handleToggleSidebar}>
						<FaIcons.FaBars />
					</Link>
				</div>
				<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
					<ul className="nav-menu-items">
						<li className="navbar-toggle">
							<Link to="#" className="menu-bars" onClick={handleToggleSidebar}>
								<AiIcons.AiOutlineClose />
							</Link>
						</li>
						<hr className="nav-hr" />
						<div className="logo-container">
							<img src={logo} alt="" className="xtreme-octane-logo" />
						</div>
						<hr className="nav-hr" />
						{SidebarData.map((item, index) => {
							return (
								<li key={index} className="nav-text">
									<Link to={item.path}>
										{item.icon}
										<span>{item.title}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</IconContext.Provider>
		</>
	);
}

export default Navbar;
