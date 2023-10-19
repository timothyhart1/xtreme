import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaRegEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Button,
	Card,
	CardBody,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
} from "reactstrap";
import { useMemberId } from "../../Contexts/MemberIdContext";
import "../../Styles/styles.css";
import CardTitle from "../CardTitle/CardTitle";
import ModalDeleteEvent from "../Modal/Modal";

const EventExpenses = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const { eventId } = useParams();
	const [total, setTotal] = useState("");
	const [expenseName, setExpenseName] = useState("");
	const [expenseAmount, setExpenseAmount] = useState();
	const [expenseCategory, setExpenseCategory] = useState("");
	const [expenseCategories, setExpenseCategories] = useState([]);
	const { memberId } = useMemberId();
	const token = sessionStorage.getItem("Token");

	const getTotalExpenses = async () => {
		const res = await axios
			.get(`${API}/EventExpense/EventExpenseTotal/${eventId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setTotal(response.data.totalExpenses);
			});
	};

	const fetchData = async () => {
		try {
			const res = await axios.get(
				`${API}/EventExpense/GetEventExpenses/${eventId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setData(res.data);
		} catch (error) {}
	};

	const fetchCategories = async () => {
		try {
			const res = await axios.get(`${API}/EventExpense/GetAllCategories`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setExpenseCategories(res.data);
		} catch (error) {}
	};

	useEffect(() => {
		fetchData().catch((error) => {
			console.error(error);
		});
		getTotalExpenses().catch((error) => {
			console.error(error);
		});
		fetchCategories().catch((error) => {
			console.error(error);
		});
	}, [eventId]);

	const AddExpense = async (e) => {
		e.preventDefault();

		const res = await axios.post(`${API}/EventExpense/AddNewEventExpense`, {
			eventId: eventId,
			expenseName: expenseName,
			expenseAmount: expenseAmount,
			addedBy: "tim",
			category: expenseCategory,
			memberId: memberId,
		});
		fetchData().catch((error) => {
			console.error(error);
		});
		getTotalExpenses().catch((error) => {
			console.error(error);
		});
	};

	const deleteEventExpense = async (eventExpenseId) => {
		const res = await axios.delete(
			`${API}/EventExpense/DeleteExpense/${eventExpenseId}`
		);
	};

	const columns = [
		{
			name: "#",
			cell: (row, index) => index + 1,
		},
		{
			name: "Expense Name",
			selector: (row) => row.expenseName,
			sortable: true,
		},
		{
			name: "Expense Amount",
			selector: (row) => "R" + row.expenseAmount,
			sortable: true,
		},
		{
			name: "Added By",
			selector: (row) => row.addedBy,
			sortable: true,
		},
		{
			name: "Date Added",
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
					<Link
						to={`/edit-event-expense/${row.eventExpenseId}/event/${row.eventId}`}
					>
						<button type="button" className="btn btn-primary" id="event-btns">
							<i className="candidate-icons">
								<FaRegEdit />
							</i>
						</button>
					</Link>
					<ModalDeleteEvent
						expenseName={row.expenseName}
						deleteId={row.eventExpenseId}
						onDelete={deleteEventExpense}
						updateData={fetchData}
						id="event-btns"
						modalTitle={`Are you sure you want to delete ${row.expenseName}?`}
					/>
				</div>
			),
		},
	];

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container">
					<CardTitle title="Add Expense" />
					<Row>
						<Form id="event-form" onSubmit={AddExpense}>
							<div className="event-container">
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Expense Name
										</Label>
										<Input
											className="form-control dark-event-input"
											required
											type="text"
											name="name"
											autoComplete="off"
											onChange={(e) => setExpenseName(e.target.value)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label for="examplePassword" id="event-label">
											Expense Amount
										</Label>
										<Input
											className="form-control dark-event-input"
											required
											type="text"
											name="name"
											autoComplete="off"
											onChange={(e) => setExpenseAmount(e.target.value)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label for="examplePassword" id="event-label">
											Expense Category
										</Label>
										<Input
											className="form-control dark-event-input"
											required
											type="select"
											name="expenseCategory"
											autoComplete="off"
											onChange={(e) => setExpenseCategory(e.target.value)}
										>
											<option value="" disabled>
												Select an option
											</option>
											{expenseCategories.map((category, index) => (
												<option key={index} value={category.expenseCategoryId}>
													{category.category}
												</option>
											))}
										</Input>
									</FormGroup>
								</Row>
							</div>
							<div className="btn-container">
								<Link to={"/events"}>
									<Button id="event-btn">Back</Button>
								</Link>
								<Link to={"/add-category"}>
									<Button id="event-btn">Add Category</Button>
								</Link>
								<Button
									type="submit"
									id="event-btn"
									style={{
										backgroundColor: "#ffc107",
										color: "#000",
										borderColor: "#ffc107",
									}}
								>
									Add Expense
								</Button>
							</div>
						</Form>
					</Row>
				</Card>
				<Card id="card-container" className="card-spacing">
					<CardTitle title="Event Expenses" />
					<p className="light-headers">{`Total expenses = R${total.toLocaleString()}`}</p>
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

export default EventExpenses;
