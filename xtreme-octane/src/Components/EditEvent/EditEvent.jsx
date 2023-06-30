import React, { useState, useEffect, Fragment } from "react";
import "../../App.css";
import axios from "axios";
import PageHeader from "../PageHeader/PageHeader";
import CardTitle from "../CardTitle/CardTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const EditEvent = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const { eventId } = useParams();

	const [event, setEvent] = useState({
		eventName: "",
		eventDesc: "",
	});

	const { eventName, eventDesc } = event;

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/Event/Single-Event/${eventId}`);
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
			const requestData = {
				eventName: eventName,
				eventDesc: eventDesc,
				eventImage: "",
			};
			let requestUrl = `${API}/Event/Edit-Event/${eventId}`;
			const req = await axios.put(requestUrl, requestData);
		} catch {
			return directiontoaster("directionsdangerToast");
		}
	};

	const onInputChange = (e) => {
		setEvent({ ...event, [e.target.name]: e.target.value });
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

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<PageHeader header="Events" />
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
											required
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
											src={`${API}/Event/Get-Event-Image/${eventId}`}
											alt="event-image"
											className="edit-event-image"
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
