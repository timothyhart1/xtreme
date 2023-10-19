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

const VerifyMembers = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const [updateTrigger, setUpdateTrigger] = useState(0);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/Member/GetAllNonVerifiedMembers`);
				setData(res.data);
			} catch (error) {}
		}

		fetchData().catch((error) => {
			console.error(error);
		});
	}, [API, updateTrigger]);

	const deleteEvent = async (vehicleId) => {
		const res = await axios.delete(`${API}/Member/DeleteMember/${vehicleId}`);
		setUpdateTrigger(updateTrigger + 1);
		return res;
	};

	const reinstateMember = async (memberId) => {
		try {
			const res = await axios.put(`${API}/Member/ReinstateMember/${memberId}`);
			setUpdateTrigger(updateTrigger + 1);
			return res;
		} catch (error) {
			console.error(error);
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
			id: "createDate",
		},
		{
			name: "Actions",
			cell: (row) => (
				<span
					className="event-items-icons text-center align-middle"
					id="event-actions"
				>
					<Link to={`/verify-member/${row.memberId}`}>
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
				</span>
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
							data={data}
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

export default VerifyMembers;
