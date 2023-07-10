import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "reactstrap";
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

const ViewEventVotes = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/EventVote/EventVotes/10`);
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
				<div style={{ textAlign: "center" }}>
					<h1>Social Media Users</h1>
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
			</Container>
		</Fragment>
	);
};

export default ViewEventVotes;
