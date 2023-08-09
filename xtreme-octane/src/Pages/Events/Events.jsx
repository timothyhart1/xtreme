import React, { useState, useEffect, Fragment } from "react";
import "../../Styles/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import CardTitle from "../CardTitle/CardTitle";
import ModalDeleteEvent from "../Modal/Modal";
import { FaRegEdit, FaRegEye, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Row,
	Card,
	Form,
	Label,
	Input,
	CardBody,
	Container,
	Button,
	FormGroup,
	Table,
} from "reactstrap";

const Events = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const [eventName, setEventName] = useState("");
	const [eventDesc, setEventDesc] = useState("");
	const [image, setImage] = useState("");
	const [imageFile, setFile] = useState();
	const token = sessionStorage.getItem("Token");

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/Event/GetAllEvents`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setData(res.data);
				console.log(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	const updateEventData = async () => {
		try {
			const res = await axios.get(`${API}/Event/GetAllEvents`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		updateEventData();
	}, []);

	const uploadImage = (e) => {
		e.preventDefault();

		if (!eventName || !eventDesc || !imageFile) {
			return;
		}

		const formData = new FormData();
		formData.append("image", imageFile);

		const queryParameters = new URLSearchParams();
		queryParameters.append("eventName", eventName);
		queryParameters.append("eventDesc", eventDesc);

		axios
			.post(
				`${API}/Event/AddNewEvent?${queryParameters.toString()}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((response) => {
				const { data } = response;
			})
			.catch((err) => {
				console.log(err);
			});
	};

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

	const getImage = (e) => {
		setFile(e.target.files[0]);
		console.log(e.target.files[0]);
	};

	const deleteEvent = async (eventId) => {
		const res = await axios.delete(`${API}/Event/DeleteEvent/${eventId}`);
	};

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container">
					<CardTitle title="Add Event" />
					<Row>
						<Form onSubmit={uploadImage} id="event-form">
							<div className="event-container">
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Event Name
										</Label>
										<Input
											className="form-control dark-event-input"
											required
											type="text"
											name="name"
											autoComplete="off"
											onChange={(e) => setEventName(e.target.value)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label for="examplePassword" id="event-label">
											Event Description
										</Label>
										<textarea
											type="text"
											rows="10"
											className="form-control dark-event-input"
											required={true}
											autoComplete="off"
											onChange={(e) => setEventDesc(e.target.value)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label for="examplePassword" id="event-label">
											Event Image
										</Label>
										<Input
											type="file"
											className="form-control image-input"
											required={true}
											onChange={getImage}
											id="event-image-input"
										/>
									</FormGroup>
								</Row>
								<Row>
									<Button type="submit" id="event-btn">
										Add Event
									</Button>
								</Row>
							</div>
						</Form>
					</Row>
				</Card>
				<Card id="card-container" className="card-spacing">
					<CardTitle title="All Events" />
					<CardBody>
						<Table id="event-table" bordered responsive>
							<thead>
								<tr>
									<th className="text-center align-middle light-headers">#</th>
									<th className="text-center align-middle light-headers">
										Event Name
									</th>
									<th className="text-center align-middle light-headers">
										Event Description
									</th>
									<th className="text-center align-middle light-headers">
										Event Date
									</th>
									<th className="text-center align-middle light-headers">
										Actions
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
												{item.eventName}
											</td>
											<td className="event-items text-center align-middle">
												{item.eventDesc}
											</td>
											<td className="event-items text-center align-middle">
												{item.eventDate.slice(0, 10)}
											</td>
											<td
												className="event-items-icons text-center align-middle"
												id="event-actions"
											>
												<Link to={`/add-event-expense/${item.eventId}`}>
													<button
														type="button"
														class="btn btn-success"
														id="event-btns"
													>
														<i className="candidate-icons">
															<FaPlus />
														</i>
													</button>
												</Link>
												<Link to={`edit-event/${item.eventId}`}>
													<button
														type="button"
														class="btn btn-primary"
														id="event-btns"
													>
														<i className="candidate-icons">
															<FaRegEdit />
														</i>
													</button>
												</Link>
												<Link to={`event-votes/${item.eventId}`}>
													<button
														type="button"
														class="btn btn-info"
														id="event-btns"
													>
														<i className="candidate-icons">
															<FaRegEye />
														</i>
													</button>
												</Link>
												<ModalDeleteEvent
													eventName={item.eventName}
													deleteId={item.eventId}
													updateData={updateEventData}
													onDelete={deleteEvent}
													modalTitle={`Are you sure you want to delete ${item.eventName}?`}
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

export default Events;