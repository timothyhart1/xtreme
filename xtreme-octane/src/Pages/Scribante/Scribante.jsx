import React, { useState, useEffect, Fragment } from "react";
import "../../Styles/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, Container } from "reactstrap";
import CardTitle from "../CardTitle/CardTitle";
import { FaRegEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";

const Scribante = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/MemberTrackTime/GetAllTrackTimes`);
				setData(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
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
			name: "Actions",
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
