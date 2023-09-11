import React, { useState, useEffect, Fragment } from "react";
import "../../Styles/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, Container, Table } from "reactstrap";
import CardTitle from "../CardTitle/CardTitle";
import { FaRegEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";

const MemberVehicles = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const memberId = sessionStorage.getItem("MemberId");
	const token = sessionStorage.getItem("Token");

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(
					`${API}/Vehicle/GetAllMemberVehicles/${memberId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setData(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [API, memberId, token]);

	const directiontoaster = (toastname) => {
		switch (toastname) {
			case "directionssuccessToast":
				toast.success("Event was successfully added!", {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 1500,
				});
				break;
			case "directionsdangerToast":
				toast.error("There was an error adding the event!", {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 1500,
				});
				break;
		}
	};

	const columns = [
		{
			name: "#",
			cell: (row, index) => index + 1,
		},
		{
			name: "Year",
			selector: (row) => row.year,
			sortable: true,
		},
		{
			name: "Manufacturer",
			selector: (row) => row.manufacturer,
			sortable: true,
		},
		{
			name: "Model",
			selector: (row) => row.model,
			sortable: true,
		},
		{
			name: "Mileage",
			selector: (row) => row.mileage.toLocaleString(),
			sortable: true,
		},
		{
			name: "Plate",
			selector: (row) => row.plate,
			sortable: true,
		},
		{
			name: "Colour",
			selector: (row) => row.color,
			sortable: true,
		},
		{
			name: "Actions",
			cell: (row) => (
				<td
					className="event-items-icons text-center align-middle"
					id="event-actions"
				>
					<Link to={`/edit-vehicle/${row.vehicleId}`} id="vehicle-model">
						<button type="button" class="btn btn-info">
							<i>
								<FaRegEdit />
							</i>
						</button>
					</Link>
				</td>
			),
		},
	];

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container" className="card-spacing">
					<CardTitle title="My Vehicles" />
					<CardBody>
						<Link
							to={`/add-vehicle`}
							id="vehicle-model"
							style={{ textAlign: "left" }}
						>
							<button
								type="button"
								class="btn btn-xo"
								style={{ marginBottom: "10px" }}
							>
								Add Vehicle
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

export default MemberVehicles;
