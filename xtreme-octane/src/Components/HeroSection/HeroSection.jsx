import React, { Fragment, useState, useEffect } from "react";
import "./HeroSection.css";
import { Card, Container } from "reactstrap";
import PageHeader from "../PageHeader/PageHeader";
import CardTitle from "../CardTitle/CardTitle";
import axios from "axios";

const HeroSection = () => {
	const API = window.appConfig.API;
	const [memberCount, setMemberCount] = useState("");
	const [vehicleCount, setVehicleCount] = useState("");

	const getMemberCount = async () => {
		const res = await axios
			.get(`${API}/Member/All-Members`)
			.then((response) => {
				setMemberCount(response.data.length);
				console.log(response.data.length);
			});
	};

	const getVehicleCount = async () => {
		const res = await axios
			.get(`${API}/Vehicle/All-Vehicles`)
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
				<PageHeader header="Home" />
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
