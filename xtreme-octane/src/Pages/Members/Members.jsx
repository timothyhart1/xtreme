import React, { useState, useEffect, Fragment } from "react";
import "../../Styles/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, Container, Table } from "reactstrap";
import ModalDeleteEvent from "../Modal/Modal";
import { FaEye, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardTitle from "../CardTitle/CardTitle";

const Members = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const [eventName, setEventName] = useState("");
	const [eventDesc, setEventDesc] = useState("");
	const [updateTrigger, setUpdateTrigger] = useState(0);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/Member/GetAllMembers`);
				setData(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [updateTrigger]);

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

	const deleteEvent = async (vehicleId) => {
		const res = await axios.delete(`${API}/Member/DeleteMember/${vehicleId}`);
		setUpdateTrigger(updateTrigger + 1);
	};

	const reinstateMember = async (memberId) => {
		try {
			const res = await axios.put(`${API}/Member/ReinstateMember/${memberId}`);
			setUpdateTrigger(updateTrigger + 1);
		} catch (e) {
			console.error(e.message);
		}
	};

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container" className="card-spacing">
					<CardTitle title="Members" />
					<CardBody>
						<Table id="event-table" bordered responsive>
							<thead>
								<tr>
									<th className="text-center align-middle light-headers">#</th>
									<th className="text-center align-middle light-headers">
										Name
									</th>
									<th className="text-center align-middle light-headers">
										Surname
									</th>
									<th className="text-center align-middle light-headers">
										Cell
									</th>
									<th className="text-center align-middle light-headers">
										City
									</th>
									<th className="text-center align-middle light-headers">
										Date Joined
									</th>
									<th className="text-center align-middle"></th>
								</tr>
							</thead>
							<tbody>
								{data.map((member, index) => {
									return (
										<tr key={index}>
											<th
												scope="row"
												className="text-center align-middle light-headers"
											>
												{index + 1}
											</th>
											<td className="event-items text-center align-middle light-headers">
												{member.name}
											</td>
											<td className="event-items text-center align-middle light-headers">
												{member.surname}
											</td>
											<td className="event-items text-center align-middle light-headers">
												{member.phoneNumber}
											</td>
											<td className="event-items text-center align-middle light-headers">
												{member.city}
											</td>
											<td className="event-items text-center align-middle light-headers">
												{member.createDate.slice(0, 10)}
											</td>
											<td
												className="event-items-icons text-center align-middle"
												id="event-actions"
											>
												<Link to={`/view-member/${member.memberId}`}>
													<button
														type="button"
														className="btn btn-info"
														id="event-btns"
													>
														<i className="table-icons">
															<FaEye />
														</i>
													</button>
												</Link>
												{member.deleted ? (
													<button
														type="button"
														className="btn btn-success"
														id="event-btns"
														onClick={() => reinstateMember(member.memberId)}
													>
														<FaPlus />
													</button>
												) : (
													<ModalDeleteEvent
														eventName={member.name}
														eventId={member.memberId}
														deleteId={member.memberId}
														onDelete={deleteEvent}
														id="event-btns"
														modalTitle={`Are you sure you want to delete ${member.name}?`}
													/>
												)}
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
