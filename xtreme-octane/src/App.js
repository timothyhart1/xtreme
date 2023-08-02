import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./Pages/Navbar/Navbar";
import { AuthProvider } from "./Pages/Auth/Auth";
import { RequireAuth } from "./Pages/Auth/RequireAuth";
import HeroSection from "./Pages/HeroSection/HeroSection";
import Events from "./Pages/Events/Events";
import EditEvent from "./Pages/EditEvent/EditEvent";
import Members from "./Pages/Members/Members";
import Vehicles from "./Pages/Vehicles/Vehicles";
import Scribante from "./Pages/Scribante/Scribante";
import ViewEvents from "./Pages/ViewEvents/ViewEvents";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import VoteEvent from "./Pages/VoteEvent/VoteEvents";
import ViewEventVotes from "./Pages/ViewEventVotes/ViewEvents";
import EventExpenses from "./Pages/EventExpenses/EventExpenses";
import AddVehicle from "./Pages/AddVehicle/AddVehicle";
import EditEventExpenses from "./Pages/EditEventExpense/EditEventExpenses";
import ViewVehicle from "./Pages/ViewVehicle/ViewVehicle";
import MemberVehicles from "./Pages/MemberVehicles/MemberVehicles";
import EditVehicle from "./Pages/EditVehicle/EditVehicle";
import ViewSingleEvent from "./Pages/ViewSingleEvent/ViewSingleEvent";

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
							path="view-event/:eventId"
							element={
								<RequireAuth>
									<ViewSingleEvent />
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
						<Route
							path="edit-vehicle/:vehicleId"
							element={
								<RequireAuth>
									<EditVehicle />
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
