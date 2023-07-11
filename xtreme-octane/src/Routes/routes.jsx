import HeroSection from "../Components/HeroSection/HeroSection";
import Events from "../Components/Events/Events";
import EditEvent from "../Components/EditEvent/EditEvent";
import Members from "../Components/Members/Members";
import Vehicles from "../Components/Vehicles/Vehicles";
import Scribante from "../Components/Scribante/Scribante";
import ViewEvents from "../Components/ViewEvents/ViewEvents";
import EditProfile from "../Components/EditProfile/EditProfile";
import Login from "../Components/Auth/Login/Login";
import Register from "../Components/Auth/Register/Register";
import VoteEvent from "../Components/VoteEvent/VoteEvents";
import ViewEventVotes from "../Components/ViewEventVotes/ViewEvents";
import EventExpenses from "../Components/EventExpenses/EventExpenses";
import AddVehicle from "../Components/AddVehicle/AddVehicle";
import EditEventExpenses from "../Components/EditEventExpense/EditEventExpenses";
import ViewVehicle from "../Components/ViewVehicle/ViewVehicle";

const routes = [
	{
		path: "/",
		Component: HeroSection,
	},
	{
		path: "events",
		Component: Events,
	},
	{
		path: "events/edit-event/:eventId",
		Component: EditEvent,
	},
	{
		path: "members",
		Component: Members,
	},
	{
		path: "vehicles",
		Component: Vehicles,
	},
	{
		path: "scribante",
		Component: Scribante,
	},
	{
		path: "vehicles/view-vehicle/:vehicleId",
		Component: ViewVehicle,
	},
	{
		path: "view-events",
		Component: ViewEvents,
	},
	{
		path: "edit-profile",
		Component: EditProfile,
	},
	{
		path: "register",
		Component: Register,
	},
	{
		path: "login",
		Component: Login,
	},
	{
		path: "vote-event/:eventId",
		Component: VoteEvent,
	},
	{
		path: "events/event-votes/:eventId",
		Component: ViewEventVotes,
	},
	{
		path: "add-event-expense/:eventId",
		Component: EventExpenses,
	},
	{
		path: "edit-event-expense/:eventExpenseId/event/:eventId",
		Component: EditEventExpenses,
	},
	{
		path: "add-vehicle",
		Component: AddVehicle,
	},
];

export default routes;
