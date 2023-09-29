import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import "../../Styles/styles.css";
import CardTitle from "../CardTitle/CardTitle";

const VerifyMember = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const [vehicleData, setVehicleData] = useState([]);
	const token = sessionStorage.getItem("Token");
	const { memberId } = useParams();

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					`${API}/Member/GetSingleMember/${memberId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setData(res.data);
			} catch (error) {
				console.error(error);
			}
		}

		async function fetchMemberVehicles() {
			try {
				const res = await axios.get(
					`${API}/Vehicle/GetAllMemberVehicles/${memberId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setVehicleData(res.data);
			} catch (error) {
				console.error(error);
			}
		}
		fetchData().catch((error) => {
			console.error(error)
		});
		
		fetchMemberVehicles().catch((error) => {
			console.error(error)
		});
		
	}, [API, token, memberId]);

	const verifyMember = async (memberId) => {
		try {
			await axios.put(`${API}/Member/VerifyMember/${memberId}`);
			toast.success("Member verified successfully.");
		} catch (e) {
			console.error(e.message);
			toast.error("Failed to verify member.");
		}
	};

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container" className="card-spacing">
					<CardTitle title="View Member" />
					<CardBody id="event-card-body">
						<Col>
							<Row>
								<h4 className="white-text">
									{data.name} {data.surname}
								</h4>
							</Row>
							<Row>
								<h6 className="white-text">City: {data.city}</h6>
							</Row>
							<Row>
								<h6 className="white-text">Cell: {data.phoneNumber}</h6>
							</Row>
							<Row>
								<h6 className="white-text">Gender: {data.gender}</h6>
							</Row>
							<Row>
								<h6 className="white-text">Date Joined: {data.createDate}</h6>
							</Row>
							<Row style={{ marginTop: "20px" }}>
								<h4 className="white-text">Vehicles Owned</h4>
								{vehicleData.length > 0 ? (
									vehicleData.map((vehicle, index) => (
										<tr key={index}>
											<h6 className="white-text">
												{vehicle.year} {vehicle.manufacturer} {vehicle.model} |
												Plate: {vehicle.plate}
											</h6>
										</tr>
									))
								) : (
									<h6 className="white-text">No Vehicles Found.</h6>
								)}
							</Row>
							<br></br>
							<Row>
								<Button
									type="button"
									id="event-btn"
									onClick={() => verifyMember(memberId)}
								>
									Verify Member
								</Button>
							</Row>
						</Col>
					</CardBody>
				</Card>
			</Container>
		</Fragment>
	);
};

export default VerifyMember;
