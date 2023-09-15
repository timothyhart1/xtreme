import React, { useState, useEffect, Fragment } from "react";
import "../../Styles/styles.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import CardTitle from "../CardTitle/CardTitle";
import ModalDeleteEvent from "../Modal/Modal";
import { FaRegEdit, FaRegEye, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Row,
	Card,
	Form,
	Label,
	Input,
	CardBody,
	Container,
	Button,
	FormGroup,
	Table,
} from "reactstrap";
import DataTable from "react-data-table-component";

const EventExpenses = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const { eventId } = useParams();
	const [total, setTotal] = useState("");
	const [expenseName, setExpenseName] = useState("");
	const [expenseAmount, setExpenseAmount] = useState();
	const [expenseCategory, setExpenseCategory] = useState("");
	const [expenseCategories, setExpenseCategories] = useState([]);

	const getTotalExpenses = async () => {
		const res = await axios
			.get(`${API}/EventExpense/EventExpenseTotal/${eventId}`)
			.then((response) => {
				setTotal(response.data.totalExpenses);
			});
	};

	const fetchData = async () => {
		try {
			const res = await axios.get(
				`${API}/EventExpense/GetEventExpenses/${eventId}`
			);
			setData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchCategories = async () => {
		try {
			const res = await axios.get(`${API}/EventExpense/GetAllCategories`);
			setExpenseCategories(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
		getTotalExpenses();
		fetchCategories();
	}, [eventId]);

	const AddExpense = async (e) => {
		e.preventDefault();

		const res = await axios.post(`${API}/EventExpense/AddNewEventExpense`, {
			eventId: eventId,
			expenseName: expenseName,
			expenseAmount: expenseAmount,
			addedBy: "tim",
			category: expenseCategory,
		});
		fetchData();
		getTotalExpenses();
	};

	const deleteEventExpense = async (eventId) => {
		const res = await axios.delete(
			`${API}/EventExpense/DeleteExpense/${eventId}`
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
						</Form>
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
