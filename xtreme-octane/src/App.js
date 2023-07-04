import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import routes from "./Routes/routes";

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<BrowserRouter>
			<Navbar toggleSidebar={toggleSidebar} />
			<div id="app-container" className={sidebarOpen ? "sidebar-open" : ""}>
				<Routes>
					{routes.map(({ path, Component }) => (
						<Route key={path} path={path} element={<Component />} />
					))}
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
