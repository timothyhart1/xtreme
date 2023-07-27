import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { AuthProvider } from "./Components/Auth/Auth";
import { RequireAuth } from "./Components/Auth/RequireAuth";
import HeroSection from "./Components/HeroSection/HeroSection";
import Events from "./Components/Events/Events";
import EditEvent from "./Components/EditEvent/EditEvent";
import Members from "./Components/Members/Members";
import Vehicles from "./Components/Vehicles/Vehicles";
import Scribante from "./Components/Scribante/Scribante";
import ViewEvents from "./Components/ViewEvents/ViewEvents";
import EditProfile from "./Components/EditProfile/EditProfile";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";
import VoteEvent from "./Components/VoteEvent/VoteEvents";
import ViewEventVotes from "./Components/ViewEventVotes/ViewEvents";
import EventExpenses from "./Components/EventExpenses/EventExpenses";
import AddVehicle from "./Components/AddVehicle/AddVehicle";
import EditEventExpenses from "./Components/EditEventExpense/EditEventExpenses";
import ViewVehicle from "./Components/ViewVehicle/ViewVehicle";
import MemberVehicles from "./Components/MemberVehicles/MemberVehicles";

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<AuthProvider>
			<BrowserRouter>
				<Navbar toggleSidebar={toggleSidebar} />
				<div id="app-container" className={sidebarOpen ? "sidebar-open" : ""}>
					<Routes>
						<Route
							path="/"
							element={
								<RequireAuth>
									<HeroSection />
								</RequireAuth>
							}
						/>
						<Route
							path="events"
							element={
								<RequireAuth>
									<Events />
								</RequireAuth>
							}
						/>
						<Route
							path="events/edit-event/:eventId"
							element={
								<RequireAuth>
									<EditEvent />
								</RequireAuth>
							}
						/>
						<Route
							path="members"
							element={
								<RequireAuth>
									<Members />
								</RequireAuth>
							}
						/>
						<Route
							path="vehicles"
							element={
								<RequireAuth>
									<Vehicles />
								</RequireAuth>
							}
						/>
						<Route
							path="scribante"
							element={
								<RequireAuth>
									<Scribante />
								</RequireAuth>
							}
						/>
						<Route
							path="vehicles/view-vehicle/:vehicleId"
							element={
								<RequireAuth>
									<ViewVehicle />
								</RequireAuth>
							}
						/>
						<Route
							path="view-events"
							element={
								<RequireAuth>
									<ViewEvents />
								</RequireAuth>
							}
						/>
						<Route
							path="edit-profile"
							element={
								<RequireAuth>
									<EditProfile />
								</RequireAuth>
							}
						/>
						<Route path="register" element={<Register />} />
						<Route path="login" element={<Login />} />
						<Route
							path="vote-event/:eventId"
							element={
								<RequireAuth>
									<VoteEvent />
								</RequireAuth>
							}
						/>
						<Route
							path="events/event-votes/:eventId"
							element={
								<RequireAuth>
									<ViewEventVotes />
								</RequireAuth>
							}
						/>
						<Route
							path="add-event-expense/:eventId"
							element={
								<RequireAuth>
									<EventExpenses />
								</RequireAuth>
							}
						/>
						<Route
							path="edit-event-expense/:eventExpenseId/event/:eventId"
							element={
								<RequireAuth>
									<EditEventExpenses />
								</RequireAuth>
							}
						/>
						<Route
							path="add-vehicle"
							element={
								<RequireAuth>
									<AddVehicle />
								</RequireAuth>
							}
						/>
						<Route
							path="member-vehicles"
							element={
								<RequireAuth>
									<MemberVehicles />
								</RequireAuth>
							}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
