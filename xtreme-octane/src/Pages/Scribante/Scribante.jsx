import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, Container } from "reactstrap";
import "../../Styles/styles.css";
import CardTitle from "../CardTitle/CardTitle";

const Scribante = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const token = sessionStorage.getItem("Token");

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/MemberTrackTime/GetAllTrackTimes`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setData(res.data);
			} catch (error) {}
		}
		fetchData().catch((error) => {
			console.error(error);
		});
	}, []);

	const columns = [
		{
			name: "#",
			cell: (row, index) => index + 1,
		},
		{
			name: "Time",
			selector: (row) =>
				row.lapTimeMinutes +
				":" +
				row.lapTimeSeconds +
				":" +
				row.lapTimeMiliseconds,
			sortable: true,
		},
		{
			name: "Conditions",
			selector: (row) => row.conditions,
			sortable: true,
		},
		{
			name: "Vehicle",
			cell: (row) => (
				<Link
					to={`/vehicles/view-vehicle/${row.vehicleId}`}
					style={{
						color: "#fff",
						textDecoration: "none",
						cursor: "pointer",
					}}
				>
					{row.vehicle.year} {row.vehicle.manufacturer} {row.vehicle.model}
				</Link>
			),
			sortable: true,
		},
		{
			name: "Plate",
			selector: (row) => row.vehicle.plate,
			sortable: true,
		},
		{
			name: "Driver",
			cell: (row) => (
				<table>
					<tbody>
						<tr>
							<td
								className="event-items-icons text-center align-middle"
								id="event-actions"
							>
								<Link
									to={`/view-member/${row.memberId}`}
									style={{
										color: "#fff",
										textDecoration: "none",
										cursor: "pointer",
									}}
								>
									{row.vehicle.member.name} {row.vehicle.member.surname}
								</Link>
							</td>
						</tr>
					</tbody>
				</table>
			),
		},
	];

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container" className="card-spacing">
					<CardTitle title="All Lap Times" />
					<CardBody>
						<Link
							to={`/add-lap-time`}
							id="vehicle-model"
							style={{ textAlign: "left" }}
						>
							<button
								type="button"
								className="btn btn-xo"
								style={{ marginBottom: "10px" }}
							>
								Add Lap Time
							</button>
						</Link>
						<DataTable
							columns={columns}
							data={data}
							fixedHeader
							pagination
							className="data-table-xo"
						/>
					</CardBody>
				</Card>
			</Container>
		</Fragment>
	);
};

export default Scribante;
