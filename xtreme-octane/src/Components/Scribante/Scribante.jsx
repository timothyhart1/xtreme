import React, { useState, useEffect, Fragment } from "react";
import "./Scribante.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, Container, Table } from "reactstrap";
import PageHeader from "../PageHeader/PageHeader";
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
				<PageHeader header="Events" />

				<Card id="card-container" className="card-spacing">
					<CardTitle title="All Events" />
					<CardBody>
						<Table id="event-table" bordered responsive>
							<thead>
								<tr>
									<th className="text-center align-middle">#</th>
									<th className="text-center align-middle">Time</th>
									<th className="text-center align-middle">
										Event Description
									</th>
									<th className="text-center align-middle">Event Date</th>
									<th className="text-center align-middle">Actions</th>
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
												{item.lapTime}
											</td>
											<td className="event-items text-center align-middle">
												{item.eventDesc}
											</td>

											<td className="event-items-icons text-center align-middle">
												<Link to={`edit-event/${item.eventId}`}>
													<i className="table-icons">
														<FaRegEdit />
													</i>
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
