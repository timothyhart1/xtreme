import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Tooltip, BarChart, XAxis, YAxis, Bar } from "recharts";
import { Link, useParams } from "react-router-dom";
import { Card, Container, Table } from "reactstrap";
import { FaRegEye } from "react-icons/fa";
import "../../Styles/styles.css";
import CardTitle from "../CardTitle/CardTitle";

const ViewEventVotes = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const { eventId } = useParams();
	const [voteData, setVoteData] = useState([]);

	const fetchData = async () => {
		try {
			const res = await axios.get(`${API}/EventVote/GetEventVotes/${eventId}`);
			const { yesVotes, noVotes, maybeVotes } = res.data;
			const formattedData = [
				{ name: "Yes", votes: yesVotes },
				{ name: "No", votes: noVotes },
				{ name: "Maybe", votes: maybeVotes },
			];
			setData(formattedData);
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchMemberVotes = async () => {
		try {
			const res = await axios.get(
				`${API}/EventVote/GetMemberVoteDetails/${eventId}`
			);
			setVoteData(res.data);
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
		fetchMemberVotes();
	}, [API]);

	return (
		<Fragment>
			<Container fluid={true}>
				<Card id="card-container">
					<CardTitle title="Event Votes" />
					<div style={{ textAlign: "center" }} className="chart-container">
						<div className="App">
							{data.length > 0 ? (
								<Fragment>
									<BarChart width={500} height={300} data={data} barSize={20}>
										<XAxis
											dataKey="name"
											scale="point"
											padding={{ left: 10, right: 10 }}
										/>
										<YAxis />
										<Tooltip />
										<Bar
											dataKey="votes"
											fill="#3273b5"
											background={{ fill: "#eee" }}
										/>
									</BarChart>
								</Fragment>
							) : (
								<p>Loading chart...</p>
							)}
						</div>
					</div>
					<Table id="event-table" bordered responsive>
						<thead>
							<tr>
								<th className="text-center align-middle light-headers">#</th>
								<th className="text-center align-middle light-headers">Vote</th>
								<th className="text-center align-middle light-headers">
									Voted By
								</th>
								<th className="text-center align-middle"></th>
							</tr>
						</thead>
						<tbody>
							{voteData.map((item, index) => {
								return (
									<tr key={index}>
										<th
											scope="row"
											className="text-center align-middle light-headers"
										>
											{index + 1}
										</th>
										<td className="event-items text-center align-middle">
											{item.vote}
										</td>
										<td className="event-items text-center align-middle">
											{item.memberName} {item.memberSurname}
										</td>
										<td className="event-items-icons text-center align-middle">
											<Link to={`/view-member/${item.memberId}`}>
												<button
													type="button"
													class="btn btn-info"
													id="event-btns"
												>
													<i className="candidate-icons">
														<FaRegEye />
													</i>
												</button>
											</Link>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</Card>
			</Container>
		</Fragment>
	);
};

export default ViewEventVotes;