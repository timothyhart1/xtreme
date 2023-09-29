import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Container } from "reactstrap";
import "../../Styles/styles.css";
import CardTitle from "../CardTitle/CardTitle";

const HeroSection = () => {
	const API = window.appConfig.API;
	const [memberCount, setMemberCount] = useState("");
	const [vehicleCount, setVehicleCount] = useState("");

	const getMemberCount = async () => {
		const res = await axios
			.get(`${API}/Member/GetAllMembers`)
			.then((response) => {
				setMemberCount(response.data.length);
			});
	};

	const getVehicleCount = async () => {
		const res = await axios
			.get(`${API}/Vehicle/GetAllVehicles`)
			.then((response) => {
				setVehicleCount(response.data.length);
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
					<CardTitle title="Dashboard" />
					<h5 className="header-white">Member count: {memberCount}</h5>
					<h5 className="header-white">Vehicle count: {vehicleCount}</h5>
				</Card>
			</Container>
		</Fragment>
	);
};

export default HeroSection;
