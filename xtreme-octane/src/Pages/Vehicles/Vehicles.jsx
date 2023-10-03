import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, Container } from "reactstrap";
import "../../Styles/styles.css";
import CardTitle from "../CardTitle/CardTitle";

const Vehicles = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/Vehicle/GetAllVehicles`);
				setData(res.data);
				setFilteredData(res.data);
			} catch (error) {
				console.log(error);
			}
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
			name: "Year",
			selector: (row) => row.year,
			sortable: true,
		},
		{
			name: "Colour",
			selector: (row) => row.color,
		},
		{
			name: "Owned By",
			selector: (row) => row.member.name + " " + row.member.surname,
		},
		{
			name: "Actions",
			cell: (row) => (
				<div
					className="event-items-icons text-center align-middle"
					id="event-actions"
				>
					<Link to={`view-vehicle/${row.vehicleId}`} id="vehicle-model">
						<button type="button" className="btn btn-info">
							<i>
								<FaEye />
							</i>
						</button>
					</Link>
				</div>
			),
		},
	];

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container" className="card-spacing">
					<CardTitle title="Vehicles" />
					<CardBody>
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

export default Vehicles;
