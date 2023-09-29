import axios from "axios";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Container } from "reactstrap";
import { useMemberId } from "../../Contexts/MemberIdContext";
import "../../Styles/styles.css";

const VoteEvent = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const { eventId } = useParams();
	const [vote, setVote] = useState("");
	const { memberId } = useMemberId();
	const [voteResult, setVoteResult] = useState("");
	const token = sessionStorage.getItem("Token");

	const getMemberVote = useCallback(async () => {
		const res = await axios.get(
			`${API}/EventVote/MemberEventVote/${eventId.slice(1)}`,
			{
				params: {
					memberId: memberId,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		setVoteResult(res.data);
	}, [API, eventId, memberId, token]);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					`${API}/Event/GetSingleEvent/${eventId.slice(1)}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setData(res.data);
			} catch (error) {
				console.error(error);
			}
		}
		fetchData().catch((error) => {
			console.error(error)
		});
		
		getMemberVote().catch((error) => {
			console.error(error)
		});
		
	}, [API, eventId, token, getMemberVote]);

	const handleButtonClick = (value) => {
		setVote(value);
	};

	const eventVote = async (e) => {
		e.preventDefault();

		const res = await axios.post(
			`${API}/EventVote/AddEventVote/${eventId.slice(1)}`,
			{
				memberId: memberId,
				vote: vote,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return res.data;
	};

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container" className="card-spacing">
					<img
						alt="Sample"
						src={`${API}/Event/GetEventImage/${eventId.slice(1)}`}
						className="event-image-vote"
					/>
					<h4 style={{ textAlign: "center", marginTop: "10px" }}>
						{data.eventName}
					</h4>
					<h6 style={{ textAlign: "center" }}>Are you attending?</h6>
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

export default VoteEvent;
