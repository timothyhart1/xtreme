import React, { useState, useEffect, Fragment } from "react";
import "../../Styles/styles.css";
import axios from "axios";
import { Card, CardBody, Container, Table } from "reactstrap";
import ModalDeleteEvent from "../Modal/Modal";
import { FaEye, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardTitle from "../CardTitle/CardTitle";
import DataTable from "react-data-table-component";

const Members = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]); // State for filtered data
	const [updateTrigger, setUpdateTrigger] = useState(0);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/Member/GetAllMembers`);
				setData(res.data);
				setFilteredData(res.data); // Initialize filtered data with the original data
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [updateTrigger]);

	const deleteEvent = async (vehicleId) => {
		const res = await axios.delete(`${API}/Member/DeleteMember/${vehicleId}`);
		setUpdateTrigger(updateTrigger + 1);
	};

	const reinstateMember = async (memberId) => {
		try {
			const res = await axios.put(`${API}/Member/ReinstateMember/${memberId}`);
			setUpdateTrigger(updateTrigger + 1);
		} catch (e) {
			console.error(e.message);
		}
	};

	const columns = [
		{
			name: "#",
		},
		{
			name: "Name",
			selector: (row) => row.name,
			sortable: true,
		},
		{
			name: "Surname",
			selector: (row) => row.surname,
			sortable: true,
		},
		{
			name: "Cell",
			selector: (row) => row.phoneNumber,
		},
		{
			name: "City",
			selector: (row) => row.city,
			sortable: true,
		},
		{
			name: "Date Joined",
			selector: (row) => row.createDate,
			sortable: true,
		},
	];

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container" className="card-spacing">
					<CardTitle title="Members" />
					<CardBody>
						<DataTable
							columns={columns}
							data={filteredData}
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

export default Members;
