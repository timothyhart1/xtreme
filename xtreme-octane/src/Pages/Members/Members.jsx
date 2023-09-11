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
import { Link } from "react-router-dom";

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
			cell: (row, index) => index + 1,
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
			selector: (row) => row.createDate.slice(0, 10),
			sortable: true,
		},
		{
			name: "Actions",
			cell: (row) => (
				<td
					className="event-items-icons text-center align-middle"
					id="event-actions"
				>
					<Link to={`/view-member/${row.memberId}`}>
						<button type="button" className="btn btn-info" id="event-btns">
							<i className="table-icons">
								<FaEye />
							</i>
						</button>
					</Link>
					{row.deleted ? (
						<button
							type="button"
							className="btn btn-success"
							id="event-btns"
							onClick={() => reinstateMember(row.memberId)}
						>
							<FaPlus />
						</button>
					) : (
						<ModalDeleteEvent
							eventName={row.name}
							eventId={row.memberId}
							deleteId={row.memberId}
							onDelete={deleteEvent}
							id="event-btns"
							modalTitle={`Are you sure you want to delete ${row.name}?`}
						/>
					)}
				</td>
			),
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
