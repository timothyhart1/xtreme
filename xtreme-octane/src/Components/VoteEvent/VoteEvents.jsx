import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../PageHeader/PageHeader";
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

const VoteEvent = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const { eventId } = useParams();
	const [vote, setVote] = useState("");
	const memberId = sessionStorage.getItem("MemberId");

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					`${API}/Event/Single-Event/${eventId.slice(1)}`
				);
				setData(res.data);
				console.log(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	const handleButtonClick = (value) => {
		setVote(value);
	};

	const eventVote = async (e) => {
		e.preventDefault();

		const res = await axios.post(
			`${API}/EventVote/Add-Event-Vote/${eventId.slice(1)}`,
			{
				memberId: memberId,
				vote: vote,
			}
		);
	};

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<PageHeader header="Events" />
				<Card id="card-container" className="card-spacing">
					<img
						alt="Sample"
						src={`${API}/Event/Get-Event-Image/${eventId.slice(1)}`}
						className="event-image-vote"
					/>
					<h4 style={{ textAlign: "center", marginTop: "10px" }}>
						{data.eventName}
					</h4>
					<h6 style={{ textAlign: "center" }}>Are you attending?</h6>
					<form onSubmit={eventVote}>
						<div className="vote-btns" style={{ textAlign: "center" }}>
							<Button
								color="primary"
								style={{ margin: "5px", width: "100px" }}
								onClick={() => handleButtonClick("yes")}
								type="submit"
							>
								Yes
							</Button>
							<Button
								color="danger"
								style={{ margin: "5px", width: "100px" }}
								onClick={() => handleButtonClick("no")}
								type="submit"
							>
								No
							</Button>
							<Button
								color="warning"
								style={{ margin: "5px", width: "100px" }}
								onClick={() => handleButtonClick("maybe")}
								type="submit"
							>
								Maybe
							</Button>
						</div>
					</form>
				</Card>
			</Container>
		</Fragment>
	);
};

export default VoteEvent;
