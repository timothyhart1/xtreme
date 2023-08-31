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

const EventExpenses = () => {
	const API = window.appConfig.API;
	const [data, setData] = useState([]);
	const { eventId } = useParams();
	const [total, setTotal] = useState("");
	const [expenseName, setExpenseName] = useState("");
	const [expenseAmount, setExpenseAmount] = useState();
	const [expenseCategory, setExpenseCategory] = useState("");

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

	useEffect(() => {
		fetchData();
		getTotalExpenses();
	}, [eventId]);

	const addExpense = async (e) => {
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

	const expenseCategories = [
		"",
		"Food",
		"Refreshments",
		"Hiring",
		"Lighting",
		"Sound",
	];

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container">
					<CardTitle title="Add Expense" />
					<Row>
						<Form id="event-form" onSubmit={addExpense}>
							<div className="event-container">
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Expense Name
										</Label>
										<Input
											className="form-control event-input"
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
											className="form-control event-input"
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
											className="form-control event-input"
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
												<option key={index} value={category}>
													{category}
												</option>
											))}
										</Input>
									</FormGroup>
								</Row>
								<Row>
									<div className="btn-container">
										<Link to={"/events"}>
											<Button
												id="event-btn"
												style={{
													backgroundColor: "#ffc107",
													color: "#000",
													borderColor: "#ffc107",
												}}
											>
												Back
											</Button>
										</Link>
										<Button type="submit" id="event-btn">
											Add Expense
										</Button>
									</div>
								</Row>
							</div>
						</Form>
					</Row>
				</Card>
				<Card id="card-container" className="card-spacing">
					<CardTitle title="Event Expenses" />
					<p className="light-headers">{`Total expenses = R${total.toLocaleString()}`}</p>
					<CardBody>
						<Table id="event-table" bordered responsive>
							<thead>
								<tr>
									<th className="text-center align-middle light-headers">#</th>
									<th className="text-center align-middle light-headers">
										Expense Name
									</th>
									<th className="text-center align-middle light-headers">
										Expense Description
									</th>
									<th className="text-center align-middle light-headers">
										Added By
									</th>
									<th className="text-center align-middle light-headers">
										Date Added
									</th>
									<th className="text-center align-middle light-headers">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{data.map((item, index) => {
									return (
										<tr key={index}>
											<th
												scope="row"
												className="text-center align-middle light-headers"
											>
												{index + 1}
											</th>
											<td className="event-items text-center align-middle">
												{item.expenseName}
											</td>
											<td className="event-items text-center align-middle">
												{item.expenseAmount}
											</td>
											<td className="event-items text-center align-middle">
												{item.addedBy}
											</td>
											<td className="event-items text-center align-middle">
												{item.createDate.slice(0, 10)}
											</td>
											<td
												className="event-items-icons text-center align-middle"
												id="event-actions"
											>
												<Link
													to={`/edit-event-expense/${item.eventExpenseId}/event/${item.eventId}`}
												>
													<button
														type="button"
														className="btn btn-primary"
														id="event-btns"
													>
														<i className="candidate-icons">
															<FaRegEdit />
														</i>
													</button>
												</Link>
												<ModalDeleteEvent
													expenseName={item.expenseName}
													deleteId={item.eventExpenseId}
													onDelete={deleteEventExpense}
													updateData={fetchData}
													id="event-btns"
													modalTitle={`Are you sure you want to delete ${item.expenseName}?`}
												/>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</CardBody>
				</Card>
			</Container>
		</Fragment>
	);
};

export default EventExpenses;
