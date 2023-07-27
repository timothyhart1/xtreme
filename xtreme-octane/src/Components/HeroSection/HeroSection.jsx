import React, { Fragment, useState, useEffect } from "react";
import "./HeroSection.css";
import { Card, Container } from "reactstrap";
import CardTitle from "../CardTitle/CardTitle";
import axios from "axios";

const HeroSection = () => {
	const API = window.appConfig.API;
	const [memberCount, setMemberCount] = useState("");
	const [vehicleCount, setVehicleCount] = useState("");

	const getMemberCount = async () => {
		const res = await axios
			.get(`${API}/Member/GetAllMembers`)
			.then((response) => {
				setMemberCount(response.data.length);
				console.log(response.data.length);
			});
	};

	const getVehicleCount = async () => {
		const res = await axios
			.get(`${API}/Vehicle/GetAllVehicles`)
			.then((response) => {
				setVehicleCount(response.data.length);
				console.log(response.data.length);
			});
	};

	useEffect(() => {
		getMemberCount();
		getVehicleCount();
	}, []);

	return (
		<Fragment>
			<Container fluid={true}>
				<Card id="card-container">
					<CardTitle title="Event Details" />
					<h5>Member count: {memberCount}</h5>
					<h5>Vehicle count: {vehicleCount}</h5>
				</Card>
			</Container>
		</Fragment>
	);
};

export default HeroSection;
