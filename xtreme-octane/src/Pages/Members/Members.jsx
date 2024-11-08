import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, Container } from "reactstrap";
import "../../Styles/styles.css";
import CardTitle from "../CardTitle/CardTitle";
import ModalDeleteEvent from "../Modal/Modal";

const Members = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [updateTrigger, setUpdateTrigger] = useState(0);
	const token = sessionStorage.getItem("Token");

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/Member/GetAllMembers`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setData(res.data);
				setFilteredData(res.data);
			} catch (error) {
				console.error(error);
			}
		}
		fetchData().catch((error) => {
			console.error(error);
		});
	}, [updateTrigger]);

	const deleteEvent = async (memberId) => {
		await axios.delete(`${API}/Member/DeleteMember/${memberId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		setUpdateTrigger(updateTrigger + 1);
	};

	const reinstateMember = async (memberId) => {
		try {
			await axios.put(`${API}/Member/ReinstateMember/${memberId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
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
			id: "createDate",
			selector: (row) => row.createDate.slice(0, 10),
			sortable: true,
		},
		{
			name: "Actions",
			cell: (row) => (
				<div
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
				</div>
			),
		},
	];

	return (
		<Fragment>
			<Container fluid>
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
							defaultSortFieldId="createDate"
							defaultSortAsc={false}
						/>
					</CardBody>
				</Card>
			</Container>
		</Fragment>
	);
};

export default Members;
