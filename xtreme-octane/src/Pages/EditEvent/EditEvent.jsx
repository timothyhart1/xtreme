import React, { useState, useEffect, Fragment } from "react";
import "../../App.css";
import axios from "axios";
import CardTitle from "../CardTitle/CardTitle";
import { Link, useParams } from "react-router-dom";
import "../../Styles/styles.css";
import {
	Row,
	Card,
	Form,
	Label,
	Input,
	Container,
	Button,
	FormGroup,
} from "reactstrap";
import { Toaster } from "react-hot-toast";
import { toast } from "react-toastify";

const EditEvent = () => {
	const API = window.appConfig.API;
	const [event, setEvent] = useState({
		eventName: "",
		eventDesc: "",
	});
	const [imageFile, setImageFile] = useState(null);
	const token = sessionStorage.getItem("Token");
	const { eventId } = useParams();
	const { eventName, eventDesc } = event;

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/Event/GetSingleEvent/${eventId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setEvent(res.data);
			} catch (error) {
				console.error(error);
			}
		}
		fetchData();
	}, [API, eventId, token]);

	const submitEvent = async (e) => {
		e.preventDefault();
		try {
			const requestData = new FormData();
			requestData.append("eventName", eventName);
			requestData.append("eventDesc", eventDesc);
			requestData.append("eventImage", imageFile);

			const requestUrl = `${API}/Event/EditEvent/${eventId}?eventName=${eventName}&eventDesc=${eventDesc}&deleted=false`;
			await axios.put(requestUrl, requestData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
		} catch (error) {
			console.error(error);
		}
	};

	const onInputChange = (e) => {
		setEvent({ ...event, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e) => {
		setImageFile(e.target.files[0]);
	};

	return (
		<Fragment>
			<Toaster />
			<Container fluid>
				<Card id="card-container">
					<CardTitle title="Edit Event" />
					<Row>
						<Form onSubmit={submitEvent} id="event-form">
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
											name="eventName"
											autoComplete="off"
											value={eventName}
											onChange={onInputChange}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label
											for="eventDesc"
											className="form-label"
											id="event-label"
										>
											Event Description
										</Label>
										<textarea
											id="eventDesc"
											rows="10"
											name="eventDesc"
											className="form-control dark-event-input"
											required
											autoComplete="off"
											value={eventDesc}
											onChange={onInputChange}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Event Image
										</Label>
										<br />
										<img
											src={`${API}/Event/GetEventImage/${eventId}`}
											alt="event-image"
											className="edit-event-image"
										/>
										<br />
										<br />
										<Input
											type="file"
											className="form-control image-input"
											id="event-image-input"
											onChange={handleImageChange}
										/>
									</FormGroup>
								</Row>
							</div>
							<div className="btn-container">
								<Link to="/events">
									<Button id="event-btn">Back</Button>
								</Link>
								<Button
									color="primary"
									type="submit"
									id="event-btn"
									style={{
										backgroundColor: "#ffc107",
										color: "#000",
										borderColor: "#ffc107",
									}}
								>
									Update Event
								</Button>
							</div>
						</Form>
					</Row>
				</Card>
			</Container>
		</Fragment>
	);
};

export default EditEvent;
