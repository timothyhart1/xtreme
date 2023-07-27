import React, { useState, useEffect, Fragment } from "react";
import "./Scribante.css";
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
					<CardTitle title="All Lap Times" />
					<CardBody>
						<Table id="event-table" bordered responsive>
							<thead>
								<tr>
									<th className="text-center align-middle">#</th>
									<th className="text-center align-middle">Time</th>
									<th className="text-center align-middle">Conditions</th>
									<th className="text-center align-middle">Vehicle</th>
									<th className="text-center align-middle">Driver</th>
								</tr>
							</thead>
							<tbody>
								{data.map((item, index) => {
									return (
										<tr key={index}>
											<th scope="row" className="text-center align-middle">
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
												{item.vehicle.member.name} {item.vehicle.member.surname}
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
