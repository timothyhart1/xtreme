import jwt from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthGuard from "./Components/AuthGuard/AuthGuard";
import { EmailProvider } from "./Contexts/EmailContext";
import { MemberIdProvider } from "./Contexts/MemberIdContext";
import { UserRoleProvider } from "./Contexts/RoleContext";
import { UserIdProvider } from "./Contexts/UserIdContext";
import AddCategory from "./Pages/AddCategory/AddCategory";
import AddLapTime from "./Pages/AddLapTime/AddLapTime";
import AddVehicle from "./Pages/AddVehicle/AddVehicle";
import { AuthProvider } from "./Pages/Auth/Auth";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import { RequireAuth } from "./Pages/Auth/RequireAuth";
import EditEvent from "./Pages/EditEvent/EditEvent";
import EditEventExpenses from "./Pages/EditEventExpense/EditEventExpenses";
import EditProfile from "./Pages/EditProfile/EditProfile";
import EditVehicle from "./Pages/EditVehicle/EditVehicle";
import EventExpenses from "./Pages/EventExpenses/EventExpenses";
import Events from "./Pages/Events/Events";
import HeroSection from "./Pages/HeroSection/HeroSection";
import MemberVehicles from "./Pages/MemberVehicles/MemberVehicles";
import Members from "./Pages/Members/Members";
import Navbar from "./Pages/Navbar/Navbar";
import Scribante from "./Pages/Scribante/Scribante";
import Vehicles from "./Pages/Vehicles/Vehicles";
import VerifyMember from "./Pages/VerifyMember/VerifyMember";
import VerifyMembers from "./Pages/VerifyMembers/VerifyMembers";
import ViewEventVotes from "./Pages/ViewEventVotes/ViewEvents";
import ViewEvents from "./Pages/ViewEvents/ViewEvents";
import ViewMember from "./Pages/ViewMember/viewMember";
import ViewSingleEvent from "./Pages/ViewSingleEvent/ViewSingleEvent";
import ViewVehicle from "./Pages/ViewVehicle/ViewVehicle";
import VoteEvent from "./Pages/VoteEvent/VoteEvents";

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [userRole, setUserRole] = useState("");
	const [userId, setUserId] = useState("");
	const [email, setEmail] = useState("");
	const [memberId, setMemberId] = useState();

	useEffect(() => {
		const token = sessionStorage.getItem("Token");

		if (token) {
			const decoded = jwt(token);
			console.log(decoded);
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
													{isAuthorized(["Admin"]) ? (
														<EditEvent />
													) : (
														<AuthGuard />
													)}
												</RequireAuth>
											}
										/>
										<Route
											path="members"
											element={
												<RequireAuth>
													{isAuthorized(["Admin"]) ? (
														<Members />
													) : (
														<AuthGuard />
													)}
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
													{isAuthorized(["Admin"]) ? (
														<ViewEventVotes />
													) : (
														<AuthGuard />
													)}
												</RequireAuth>
											}
										/>
										<Route
											path="add-event-expense/:eventId"
											element={
												<RequireAuth>
													{isAuthorized(["Admin"]) ? (
														<EventExpenses />
													) : (
														<AuthGuard />
													)}
												</RequireAuth>
											}
										/>
										<Route
											path="edit-event-expense/:eventExpenseId/event/:eventId"
											element={
												<RequireAuth>
													{isAuthorized(["Admin"]) ? (
														<EditEventExpenses />
													) : (
														<AuthGuard />
													)}
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
													{isAuthorized(["Admin"]) ? (
														<AddCategory />
													) : (
														<AuthGuard />
													)}
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
													{isAuthorized(["Admin"]) ? (
														<VerifyMembers />
													) : (
														<AuthGuard />
													)}
												</RequireAuth>
											}
										/>
										<Route
											path="verify-member/:memberId"
											element={
												<RequireAuth>
													{isAuthorized(["Admin"]) ? (
														<VerifyMember />
													) : (
														<AuthGuard />
													)}
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
