import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CardTitle from "../CardTitle/CardTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { Card, CardBody, Container, CardSubtitle, Button } from "reactstrap";
import { FaCheckCircle } from "react-icons/fa";

const ViewSingleEvent = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const { eventId } = useParams();
	const [vote, setVote] = useState("");
	const memberId = sessionStorage.getItem("MemberId");
	const [voteResult, setVoteResult] = useState("");

	const getMemberVote = async () => {
		const res = await axios.get(`${API}/EventVote/MemberEventVote/${eventId}`, {
			params: {
				memberId: memberId,
			},
		});
		setVoteResult(res.data);
	};

	const handleButtonClick = (value) => {
		setVote(value);
	};

	const eventVote = async (e) => {
		e.preventDefault();

		const res = await axios.post(`${API}/EventVote/AddEventVote/${eventId}`, {
			memberId: memberId,
			vote: vote,
		});
		fetchData();
		getMemberVote();
	};

	const fetchData = async () => {
		try {
			const res = await axios.get(`${API}/Event/GetSingleEvent/${eventId}`);
			setData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
		getMemberVote();
	}, []);

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container" className="card-spacing">
					<CardTitle title="All Events" />
					<img
						alt="Sample"
						src={`${API}/Event/GetEventImage/${eventId}`}
						className="event-image-vote"
					/>
					<h4
						style={{ textAlign: "center", marginTop: "10px" }}
						className="light-headers"
					>
						{data.eventName}
					</h4>
					<p style={{ textAlign: "center" }} className="light-headers">
						{data.eventDesc}
					</p>
					<hr style={{ color: "#fff" }} />
					<h6 style={{ textAlign: "center" }} className="light-headers">
						Will You Be Attending?
					</h6>
					<form onSubmit={eventVote}>
						<div className="vote-btns" style={{ textAlign: "center" }}>
							<div className="inner-btn">
								<Button
									color="primary"
									style={{ margin: "5px", width: "100px" }}
									onClick={() => handleButtonClick("yes")}
									type="submit"
									disabled={
										voteResult.length > 0 && voteResult[0].vote === "yes"
									}
								>
									Yes
								</Button>
								{voteResult.length > 0 && voteResult[0].vote === "yes" && (
									<div className="checkmark-container">
										<FaCheckCircle id="vote-check" />
									</div>
								)}
							</div>
							<div className="inner-btn">
								<Button
									color="danger"
									style={{ margin: "5px", width: "100px" }}
									onClick={() => handleButtonClick("no")}
									type="submit"
									disabled={
										voteResult.length > 0 && voteResult[0].vote === "no"
									}
								>
									No
								</Button>
								{voteResult.length > 0 && voteResult[0].vote === "no" && (
									<div className="checkmark-container">
										<FaCheckCircle id="vote-check" />
									</div>
								)}
							</div>
							<div className="inner-btn">
								<Button
									color="warning"
									style={{ margin: "5px", width: "100px" }}
									onClick={() => handleButtonClick("maybe")}
									type="submit"
									disabled={
										voteResult.length > 0 && voteResult[0].vote === "maybe"
									}
								>
									Maybe
								</Button>
								{voteResult.length > 0 && voteResult[0].vote === "maybe" && (
									<div className="checkmark-container">
										<FaCheckCircle id="vote-check" />
									</div>
								)}
							</div>
						</div>
					</form>
				</Card>
			</Container>
		</Fragment>
	);
};

export default ViewSingleEvent;
