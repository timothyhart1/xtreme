import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import {
	PieChart,
	Pie,
	Tooltip,
	BarChart,
	XAxis,
	YAxis,
	Legend,
	CartesianGrid,
	Bar,
} from "recharts";
import { Link, useParams } from "react-router-dom";
import {
	Row,
	Card,
	Form,
	Label,
	Input,
	Container,
	Button,
	FormGroup,
	Table,
} from "reactstrap";

const ViewEventVotes = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const { eventId } = useParams();

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					`${API}/EventVote/GetEventVotes/${eventId}`
				);
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
		}
		fetchData();
	}, [API]);

	return (
		<Fragment>
			<Container fluid={true}>
				<Card id="card-container">
					<div style={{ textAlign: "center" }}>
						<div className="App">
							{data.length > 0 ? (
								<Fragment>
									<BarChart
										width={500}
										height={300}
										data={data}
										margin={{
											top: 5,
											right: 30,
											left: 80,
											bottom: 5,
										}}
										barSize={20}
									>
										<XAxis
											dataKey="name"
											scale="point"
											padding={{ left: 10, right: 10 }}
										/>
										<YAxis />
										<Tooltip />
										<Legend />
										<CartesianGrid />
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
								<th className="text-center align-middle">#</th>
								<th className="text-center align-middle">Vote</th>
								<th className="text-center align-middle">Voter</th>
							</tr>
						</thead>
						<tbody></tbody>
					</Table>
				</Card>
			</Container>
		</Fragment>
	);
};

export default ViewEventVotes;
