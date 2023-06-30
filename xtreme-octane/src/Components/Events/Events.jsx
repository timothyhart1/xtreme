import React, { useState, useEffect, Fragment } from "react";
import "./Events.css";
import axios from "axios";
import { Link } from "react-router-dom";
import PageHeader from "../PageHeader/PageHeader";
import CardTitle from "../CardTitle/CardTitle";
import ModalDeleteEvent from "../Modal/Modal";
import { FaRegEdit } from "react-icons/fa";
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

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/Event/All-Events`);
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
			const res = await axios.get(`${API}/Event/All-Events`);
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
			.post(`${API}/Event/Add-Event?${queryParameters.toString()}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
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

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<PageHeader header="Events" />
				<Card id="card-container">
					<CardTitle title="Event Details" />
					<Row>
						<Form onSubmit={uploadImage} id="event-form">
							<div className="event-container">
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Event Name
										</Label>
										<Input
											className="form-control event-input"
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
											className="form-control event-input"
											required={true}
											id="form-notes"
											autoComplete="off"
											onChange={(e) => setEventDesc(e.target.value)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label for="examplePassword" id="event-label">
											Event Description
										</Label>
										<Input
											type="file"
											className="form-control event-input image-input"
											required={true}
											id="form-notes"
											onChange={getImage}
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
									<th className="text-center align-middle">#</th>
									<th className="text-center align-middle">Event Name</th>
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
												<ModalDeleteEvent
													eventName={item.eventName}
													eventId={item.eventId}
													updateEventData={updateEventData}
													id="event-btns"
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
