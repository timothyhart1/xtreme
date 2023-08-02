import React, { useState, useEffect, Fragment } from "react";
import "../../Styles/styles.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import {
	Card,
	CardBody,
	Container,
	CardSubtitle,
	CardText,
	Button,
	Row,
	CardHeader,
} from "reactstrap";

const ViewVehicle = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState(null);
	const { vehicleId } = useParams();

	const fetchData = async () => {
		try {
			const res = await axios.get(`${API}/Vehicle/MemberVehicle/${vehicleId}`);
			console.log({ vehicleId });
			setData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [vehicleId]);

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
				<Card id="card-container" className="card-vehicle card-container">
					<Row>
						{data !== null ? (
							<CardBody style={{ display: "inline-flex" }}>
								<Card className="vehicle-card-item">
									<img
										alt="Sample"
										src={`${API}/Vehicle/Get-Vehicle-Image/${vehicleId}`}
										className="event-image"
									/>
									<CardBody>
										<CardSubtitle className="mb-2 event-header event-centre">
											{data.year} {data.manufacturer} {data.model}
										</CardSubtitle>
										<CardSubtitle className="mb-2 event-header event-centre">
											Plate: {data.plate}
											<br />
											Colour: {data.color}
										</CardSubtitle>
									</CardBody>
								</Card>
								<Card className="vehicle-card-item">
									<CardHeader id="member-vehicle-header">
										Owner Details
									</CardHeader>
									<CardBody>
										<CardSubtitle className="mb-2 event-header event-centre">
											Email: {data.member.email}
										</CardSubtitle>
										<CardSubtitle className="mb-2 event-header event-centre">
											Name: {data.member.name} {data.member.surname}
										</CardSubtitle>
										<CardSubtitle className="mb-2 event-header event-centre">
											City: {data.member.city}
										</CardSubtitle>
										<CardSubtitle className="mb-2 event-header event-centre">
											Cell: {data.member.phoneNumber}
										</CardSubtitle>
										<CardSubtitle className="mb-2 event-header event-centre">
											Gender: {data.member.gender}
										</CardSubtitle>
										<CardSubtitle className="mb-2 event-header event-centre">
											Date Joined: {data.member.createDate.slice(0, 10)}
										</CardSubtitle>
									</CardBody>
								</Card>
							</CardBody>
						) : (
							<div>loading</div>
						)}
					</Row>
				</Card>
			</Container>
		</Fragment>
	);
};

export default ViewVehicle;
