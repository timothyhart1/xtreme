import React, { useState, useEffect, Fragment } from "react";
import "./Vehicles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, Container, Table } from "reactstrap";
import PageHeader from "../PageHeader/PageHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";

const Vehicles = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const [eventName, setEventName] = useState("");
	const [eventDesc, setEventDesc] = useState("");

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/Vehicle/GetAllVehicles`);
				setData(res.data);
				console.log(res.data);
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
					<CardBody>
						<Table id="event-table" bordered responsive>
							<thead>
								<tr>
									<th className="text-center align-middle">#</th>
									<th className="text-center align-middle">Manufacturer</th>
									<th className="text-center align-middle">Model</th>
									<th className="text-center align-middle">Year</th>
									<th className="text-center align-middle">Colour</th>
									<th className="text-center align-middle">Mileage</th>
									<th className="text-center align-middle">Owned By</th>
									<th className="text-center align-middle"></th>
								</tr>
							</thead>
							<tbody>
								{data.map((vehicle, index) => {
									return (
										<tr key={index}>
											<th scope="row" className="text-center align-middle">
												{index + 1}
											</th>
											<td className="event-items text-center align-middle">
												{vehicle.manufacturer}
											</td>
											<td className="event-items text-center align-middle">
												{vehicle.model}
											</td>
											<td className="event-items text-center align-middle">
												{vehicle.year}
											</td>
											<td className="event-items text-center align-middle">
												{vehicle.color}
											</td>
											<td className="event-items text-center align-middle">
												{vehicle.mileage}
											</td>
											<td className="event-items text-center align-middle">
												{vehicle.member.name} {vehicle.member.surname}
											</td>
											<td id="event-actions">
												<Link
													to={`view-vehicle/${vehicle.vehicleId}`}
													id="vehicle-model"
												>
													<button type="button" class="btn btn-info">
														<i>
															<FaEye />
														</i>
													</button>
												</Link>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</CardBody>
				</Card>
			</Container>
		</Fragment>
	);
};

export default Vehicles;
