import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import VoteEvent from "./Pages/VoteEvent/VoteEvents";
import ViewEventVotes from "./Pages/ViewEventVotes/ViewEvents";
import EventExpenses from "./Pages/EventExpenses/EventExpenses";
import AddVehicle from "./Pages/AddVehicle/AddVehicle";
import EditEventExpenses from "./Pages/EditEventExpense/EditEventExpenses";
import ViewVehicle from "./Pages/ViewVehicle/ViewVehicle";
import MemberVehicles from "./Pages/MemberVehicles/MemberVehicles";
import EditVehicle from "./Pages/EditVehicle/EditVehicle";
import ViewSingleEvent from "./Pages/ViewSingleEvent/ViewSingleEvent";
import ViewMember from "./Pages/ViewMember/viewMember";
import AddLapTime from "./Pages/AddLapTime/AddLapTime";
import AddCategory from "./Pages/AddCategory/AddCategory";
import VerifyMembers from "./Pages/VerifyMembers/VerifyMembers";
import VerifyMember from "./Pages/VerifyMember/VerifyMember";
import Register from "./Pages/Auth/Register/Register";
import AuthGuard from "./Components/AuthGuard/AuthGuard";
import jwt from "jwt-decode";
import { MemberIdProvider } from "./Contexts/MemberIdContext";
import { UserIdProvider } from "./Contexts/UserIdContext";
import { EmailProvider } from "./Contexts/EmailContext";
import { UserRoleProvider } from "./Contexts/RoleContext";

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [userRole, setUserRole] = useState("");
	const [userId, setUserId] = useState("");
	const [email, setEmail] = useState("");
	const [memberId, setMemberId] = useState(null);

	useEffect(() => {
		const token = sessionStorage.getItem("Token");

		if (token) {
			const decoded = jwt(token);
			setUserRole(decoded.role);
			setUserId(decoded.id);
			setEmail(decoded.email);
			setMemberId(decoded.memberId);
		}
	}, []);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const isAuthorized = (allowedRoles) => {
		return allowedRoles.includes(userRole);
	};

	return (
		<AuthProvider>
			<MemberIdProvider memberId={memberId}>
				<UserIdProvider>
					<EmailProvider>
						<UserRoleProvider>
							<BrowserRouter>
								<Navbar toggleSidebar={toggleSidebar} />
								<div
									id="app-container"
									className={sidebarOpen ? "" : "sidebar-open"}
								>
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
													{isAuthorized(["Admin"]) ? <Events /> : <AuthGuard />}
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
										<Route
											path="login"
											element={<Login setUserRole={setUserRole} />}
										/>
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
											path="add-category"
											element={
												<RequireAuth>
													<AddCategory />
												</RequireAuth>
											}
										/>
										<Route
											path="add-lap-time"
											element={
												<RequireAuth>
													<AddLapTime />
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
											path="verify-members"
											element={
												<RequireAuth>
													<VerifyMembers />
												</RequireAuth>
											}
										/>
										<Route
											path="verify-member/:memberId"
											element={
												<RequireAuth>
													<VerifyMember />
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
										<Route
											path="view-member/:memberId"
											element={
												<RequireAuth>
													<ViewMember />
												</RequireAuth>
											}
										/>
									</Routes>
								</div>
							</BrowserRouter>
						</UserRoleProvider>
					</EmailProvider>
				</UserIdProvider>
			</MemberIdProvider>
		</AuthProvider>
	);
}

export default App;
