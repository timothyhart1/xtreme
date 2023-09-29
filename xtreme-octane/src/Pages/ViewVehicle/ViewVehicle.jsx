import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import "../../Styles/styles.css";

const ViewVehicle = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
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
	}, [vehicleId, API, token]);

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container-edit-vehicle" className="card-spacing">
					<div className="image-container" style={{ marginTop: "-20px" }}>
						<img
							src={`${API}/Vehicle/GetVehicleImage/${vehicleId}`}
							alt="Vehicle"
							className="edit-vehicle-image"
						/>
						<div className="gradient-overlay"></div>
						<div
							className="text-overlay"
							style={{
								paddingBottom: "15px",
								fontSize: "45px",
								paddingLeft: "10px",
							}}
						>
							{data.year} {data.manufacturer} {data.model}
						</div>
					</div>
					<CardBody id="event-card-body">
						<Col
							style={{
								marginLeft: "10px",
								marginTop: "-50px",
								zIndex: "999",
							}}
						>
							<Row>
								<h4 className="white-text">
									{data.name} {data.surname}
								</h4>
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
