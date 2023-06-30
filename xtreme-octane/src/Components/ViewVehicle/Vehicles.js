import React, { useState, useEffect, Fragment } from "react";
import "./ViewVehicles.css";
import axios from "axios";
import { Card, CardBody, Container } from "reactstrap";
import PageHeader from "../PageHeader/PageHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const ViewVehicle = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const { vehicleId } = useParams();

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					`${API}/Vehicle/MemberVehicle/id?vehicleId=${vehicleId.slice(1)}`
				);
				setData(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	const directiontoaster = (toastname) => {
		switch (toastname) {
			case "directionssuccessToast":
				toast.success("Event was successfully added!", {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 1500,
				});
				break;
			case "directionsdangerToast":
				toast.error("There was an error adding the event!", {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 1500,
				});
				break;
		}
	};

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<PageHeader header="Vehicles" />
				<Card id="card-container" className="card-spacing">
					<CardBody></CardBody>
				</Card>
			</Container>
		</Fragment>
	);
};

export default ViewVehicle;
