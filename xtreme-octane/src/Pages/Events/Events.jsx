import React, { useState, useEffect, Fragment } from "react";
import "../../Styles/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import CardTitle from "../CardTitle/CardTitle";
import ModalDeleteEvent from "../Modal/Modal";
import { FaRegEdit, FaRegEye, FaPlus } from "react-icons/fa";
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
import DataTable from "react-data-table-component";

const Events = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const [eventName, setEventName] = useState("");
	const [eventDesc, setEventDesc] = useState("");
	const [imageFile, setFile] = useState();
	const token = sessionStorage.getItem("Token");

	const fetchData = async () => {
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
				fetchData();
				setEventName("");
				setEventDesc("");
				setFile(null);
				document.getElementById("event-image-input").value = null;
				alert("Event Added.");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getImage = (e) => {
		setFile(e.target.files[0]);
	};

	const deleteEvent = async (eventId) => {
		const res = await axios.delete(`${API}/Event/DeleteEvent/${eventId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	};

	const columns = [
		{
			name: "#",
			cell: (row, index) => index + 1,
		},
		{
			name: "Event Name",
			selector: (row) => row.eventName,
			sortable: true,
		},
		{
			name: "Event Description",
			selector: (row) => row.eventDesc,
			sortable: true,
		},
		{
			name: "Event Date",
			selector: (row) => row.eventDate.slice(0, 10),
			sortable: true,
		},
		{
			name: "Actions",
			cell: (row) => (
				<div
					className="event-items-icons text-center align-middle"
					id="event-actions"
				>
					<Link to={`/add-event-expense/${row.eventId}`}>
						<button type="button" className="btn btn-success" id="event-btns">
							<i className="candidate-icons">
								<FaPlus />
							</i>
						</button>
					</Link>
					<Link to={`edit-event/${row.eventId}`}>
						<button type="button" className="btn btn-primary" id="event-btns">
							<i className="candidate-icons">
								<FaRegEdit />
							</i>
						</button>
					</Link>
					<Link to={`event-votes/${row.eventId}`}>
						<button type="button" className="btn btn-info" id="event-btns">
							<i className="candidate-icons">
								<FaRegEye />
							</i>
						</button>
					</Link>
					<ModalDeleteEvent
						eventName={row.eventName}
						deleteId={row.eventId}
						updateData={updateEventData}
						onDelete={deleteEvent}
						modalTitle={`Are you sure you want to delete ${row.eventName}?`}
					/>
				</div>
			),
		},
	];

	return (
		<Fragment>
			<Container fluid={true}>
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
											value={eventName}
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
											value={eventDesc}
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
						<DataTable
							columns={columns}
							data={data}
							fixedHeader
							pagination
							className="data-table-xo"
						/>
					</CardBody>
				</Card>
			</Container>
		</Fragment>
	);
};

export default Events;
