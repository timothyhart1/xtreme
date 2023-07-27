import React, { useState, useEffect, Fragment } from "react";
import "../../App.css";
import axios from "axios";
import CardTitle from "../CardTitle/CardTitle";
import { useParams } from "react-router-dom";
import "./EditEvent.css";
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
	const [data, setData] = useState([]);
	const { eventId } = useParams();
	const [imageFile, setImageFile] = useState(null);
	const [event, setEvent] = useState({
		eventName: "",
		eventDesc: "",
	});

	const notify = () => toast("Here is your toast.");

	const { eventName, eventDesc } = event;

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/Event/GetSingleEvent/${eventId}`);
				setEvent(res.data);
				console.log(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	const submitEvent = async (e) => {
		try {
			e.preventDefault();
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
		} catch {}
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
			<Container fluid={true}>
				<Card id="card-container">
					<CardTitle title="Event Details" />
					<Row>
						<Form onSubmit={submitEvent} id="event-form">
							<div className="event-container">
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Event Name
										</Label>
										<Input
											className="form-control event-input"
											required={true}
											type="text"
											name="eventName"
											autoComplete="off"
											value={eventName}
											onChange={(e) => onInputChange(e)}
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
											name="eventDesc"
											className="form-control event-input"
											required={true}
											autoComplete="off"
											value={eventDesc}
											onChange={(e) => onInputChange(e)}
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
								<Row>
									<Button color="primary" type="submit" id="event-btn">
										Update Event
									</Button>
								</Row>
							</div>
						</Form>
					</Row>
				</Card>
			</Container>
		</Fragment>
	);
};

export default EditEvent;
