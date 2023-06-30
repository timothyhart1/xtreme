import React, { useState, useEffect, Fragment } from "react";
import "../../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, Container, Table } from "reactstrap";
import PageHeader from "../PageHeader/PageHeader";
import ModalDeleteEvent from "../Modal/Modal";
import { FaRegEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Members = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const [eventName, setEventName] = useState("");
	const [eventDesc, setEventDesc] = useState("");

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/Member/All-Members`);
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
				<PageHeader header="Members" />
				<Card id="card-container" className="card-spacing">
					<CardBody>
						<Table id="event-table" bordered responsive>
							<thead>
								<tr>
									<th className="text-center align-middle">#</th>
									<th className="text-center align-middle">Name</th>
									<th className="text-center align-middle">Surname</th>
									<th className="text-center align-middle">Cell</th>
									<th className="text-center align-middle">City</th>
									<th className="text-center align-middle">Date Joined</th>
									<th className="text-center align-middle"></th>
								</tr>
							</thead>
							<tbody>
								{data.map((member, index) => {
									return (
										<tr key={index}>
											<th scope="row" className="text-center align-middle">
												{index + 1}
											</th>
											<td className="event-items text-center align-middle">
												{member.name}
											</td>
											<td className="event-items text-center align-middle">
												{member.surname}
											</td>
											<td className="event-items text-center align-middle">
												{member.phoneNumber}
											</td>
											<td className="event-items text-center align-middle">
												{member.city}
											</td>
											<td className="event-items text-center align-middle">
												{member.createDate.slice(0, 10)}
											</td>
											<td
												className="event-items-icons text-center align-middle"
												id="event-actions"
											>
												<Link to={`/edit-member/${member.memberId}`}>
													<button
														type="button"
														class="btn btn-primary"
														id="event-btns"
													>
														<i className="table-icons">
															<FaRegEdit />
														</i>
													</button>
												</Link>
												<ModalDeleteEvent
													eventName={member.name}
													eventId={member.memberId}
												/>
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

export default Members;
