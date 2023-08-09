import React, { useState, useEffect, Fragment } from "react";
import "../../Styles/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, Container, Table } from "reactstrap";
import CardTitle from "../CardTitle/CardTitle";
import { FaRegEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MemberVehicles = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const memberId = sessionStorage.getItem("MemberId");
	const token = sessionStorage.getItem("Token");

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					`${API}/Vehicle/GetAllMemberVehicles/${memberId}`,
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
	}, [API, memberId, token]);

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
				<Card id="card-container" className="card-spacing">
					<CardTitle title="My Vehicles" />
					<Link
						to={`/add-vehicle`}
						id="vehicle-model"
						style={{ textAlign: "center" }}
					>
						<button type="button" class="btn btn-info">
							Add Vehicle
						</button>
					</Link>
					<CardBody>
						<Table id="event-table" bordered responsive>
							<thead>
								<tr>
									<th className="text-center align-middle light-headers">#</th>
									<th className="text-center align-middle light-headers">
										Year
									</th>
									<th className="text-center align-middle light-headers">
										Manufacturer
									</th>
									<th className="text-center align-middle light-headers">
										Model
									</th>
									<th className="text-center align-middle light-headers">
										Mileage
									</th>
									<th className="text-center align-middle light-headers">
										Plate
									</th>
									<th className="text-center align-middle light-headers">
										Colour
									</th>
									<th className="text-center align-middle"></th>
								</tr>
							</thead>
							<tbody>
								{data.map((item, index) => {
									return (
										<tr key={index}>
											<th
												scope="row"
												className="text-center align-middle light-headers"
											>
												{index + 1}
											</th>
											<td className="event-items text-center align-middle">
												{item.year}
											</td>
											<td className="event-items text-center align-middle">
												{item.manufacturer}
											</td>
											<td className="event-items text-center align-middle">
												{item.model}
											</td>
											<td className="event-items text-center align-middle">
												{item.mileage.toLocaleString()}
											</td>
											<td className="event-items text-center align-middle">
												{item.plate}
											</td>
											<td className="event-items text-center align-middle">
												{item.color}
											</td>
											<td id="event-actions">
												<Link
													to={`/edit-vehicle/${item.vehicleId}`}
													id="vehicle-model"
												>
													<button type="button" class="btn btn-info">
														<i>
															<FaRegEdit />
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

export default MemberVehicles;