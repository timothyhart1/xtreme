import React, { useState, useEffect, Fragment } from "react";
import "./ViewEvents.css";
import axios from "axios";
import { Link } from "react-router-dom";
import CardTitle from "../CardTitle/CardTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Card,
	CardBody,
	Container,
	CardSubtitle,
	CardText,
	Button,
} from "reactstrap";

const ViewEvents = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/Event/GetAllEvents`);
				setData(res.data);
				console.log(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container" className="card-spacing">
					<CardTitle title="All Events" />
					<CardBody id="event-card-body">
						{data.map((item, index) => {
							return (
								<Card className="event-card-item">
									<img
										alt="Sample"
										src={`${API}/Event/GetEventImage/${item.eventId}`}
										className="event-image"
									/>
									<CardBody>
										<CardSubtitle className="mb-2 event-header event-centre">
											{item.eventName} - {item.eventDate.slice(0, 10)}
										</CardSubtitle>
										<div className="event-btn-container">
											<Link to={`/view-event-${item.eventId}`}>
												<Button id="event-btn-card">View Event</Button>
											</Link>
											<Link to={`/vote-event/:${item.eventId}`}>
												<Button id="event-btn-card">Vote</Button>
											</Link>
										</div>
									</CardBody>
								</Card>
							);
						})}
					</CardBody>
				</Card>
			</Container>
		</Fragment>
	);
};

export default ViewEvents;
