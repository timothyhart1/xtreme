import React, { useState, useEffect, Fragment } from "react";
import "../../Styles/styles.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import CardTitle from "../CardTitle/CardTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Card,
	CardBody,
	Container,
	CardSubtitle,
	CardText,
	Button,
	Row,
	Col,
} from "reactstrap";

const ViewVehicle = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const [vehicleData, setVehicleData] = useState([]);
	const token = sessionStorage.getItem("Token");
	const { vehicleId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					`${API}/Vehicle/GetMemberVehicle/${vehicleId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setData(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [vehicleId]);

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container-edit-vehicle" className="card-spacing">
					<div className="image-container" style={{ marginTop: "-20px" }}>
						<img
							src={`${API}/Vehicle/GetVehicleImage/${vehicleId}`}
							alt="event-image"
							className="edit-vehicle-image"
						/>
						<div className="gradient-overlay"></div>
						<div className="text-overlay"></div>
					</div>
					<CardBody id="event-card-body">
						<Col>
							<Row>
								<h4 className="white-text">
									{data.name} {data.surname}
								</h4>
							</Row>
							<Row>
								<h6 className="white-text">
									Manufacturer: {data.manufacturer}
								</h6>
							</Row>
							<Row>
								<h6 className="white-text">Model: {data.model}</h6>
							</Row>
							<Row>
								<h6 className="white-text">Year: {data.year}</h6>
							</Row>
							<Row>
								<h6 className="white-text">Mileage: {data.mileage}</h6>
							</Row>
							<Row>
								<h6 className="white-text">Plate: {data.plate}</h6>
							</Row>
							<Row>
								<h6 className="white-text">Colour: {data.color}</h6>
							</Row>
							<Button
								id="event-btn"
								onClick={() => navigate(-1)}
								style={{
									backgroundColor: "#3273b5",
									borderColor: "#3273b5",
									margin: "0",
								}}
							>
								Back
							</Button>
						</Col>
					</CardBody>
				</Card>
			</Container>
		</Fragment>
	);
};

export default ViewVehicle;
