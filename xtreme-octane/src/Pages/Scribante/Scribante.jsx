import React, { useState, useEffect, Fragment } from "react";
import "../../Styles/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, Container, Table } from "reactstrap";
import CardTitle from "../CardTitle/CardTitle";
import { FaRegEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Scribante = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const [eventName, setEventName] = useState("");
	const [eventDesc, setEventDesc] = useState("");

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/MemberTrackTime/GetAllTrackTimes`);
				console.log(res.data);
				setData(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container" className="card-spacing">
					<CardTitle title="All Lap Times" />
					<CardBody>
						<Table id="event-table" bordered responsive>
							<thead>
								<tr>
									<th className="text-center align-middle light-headers">#</th>
									<th className="text-center align-middle light-headers">
										Time
									</th>
									<th className="text-center align-middle light-headers">
										Conditions
									</th>
									<th className="text-center align-middle light-headers">
										Vehicle
									</th>
									<th className="text-center align-middle light-headers">
										Plate
									</th>
									<th className="text-center align-middle light-headers">
										Driver
									</th>
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
												{item.lapTimeMinutes}:{item.lapTimeSeconds}
											</td>
											<td className="event-items text-center align-middle">
												{item.conditions}
											</td>
											<td className="event-items text-center align-middle">
												{item.vehicle.year} {item.vehicle.manufacturer}{" "}
												{item.vehicle.model}
											</td>
											<td className="event-items text-center align-middle">
												{item.vehicle.plate}
											</td>
											<td className="event-items text-center align-middle">
												<Link
													to={`/view-member/${item.memberId}`}
													style={{
														color: "#fff",
														textDecoration: "none",
														cursor: "pointer",
													}}
												>
													{item.vehicle.member.name}{" "}
													{item.vehicle.member.surname}
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

export default Scribante;
