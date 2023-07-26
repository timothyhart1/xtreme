import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
	{
		title: "Home",
		path: "/",
		icon: <AiIcons.AiFillHome />,
		cName: "nav-text",
	},
	{
		title: "Members",
		path: "/members",
		icon: <FaIcons.FaPeopleArrows />,
		cName: "nav-text",
	},
	{
		title: "Vehicles",
		path: "/vehicles",
		icon: <FaIcons.FaCar />,
		cName: "nav-text",
	},
	{
		title: "Events",
		path: "/events",
		icon: <FaIcons.FaNewspaper />,
		cName: "nav-text",
	},
	{
		title: "Scribante",
		path: "/scribante",
		icon: <FaIcons.FaFlagCheckered />,
		cName: "nav-text",
	},
	{
		title: "View Events",
		path: "/view-events",
		icon: <FaIcons.FaNewspaper />,
		cName: "nav-text",
	},
	{
		title: "Edit Profile",
		path: "/edit-profile",
		icon: <FaIcons.FaNewspaper />,
		cName: "nav-text",
	},
	{
		title: "Add Vehicle",
		path: "/add-vehicle",
		icon: <FaIcons.FaCar />,
		cName: "nav-text",
	},
];
