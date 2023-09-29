import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import "../../Styles/styles.css";
import CardTitle from "../CardTitle/CardTitle";

const ViewEvents = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
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
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [API, token]);

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container" className="card-spacing">
					<CardTitle title="View Events" />
					<CardBody id="event-card-body">
						{data.map((item, index) => {
							return (
								<Card id="event-card-container" className="event-card-item">
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
											<Link
												to={`/view-event/${item.eventId}`}
												style={{ width: "100%" }}
											>
												<Button id="event-btn-card">View Event</Button>
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
