import React, { useState, useEffect, Fragment } from "react";
import "../../Styles/styles.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
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

const EditEventExpenses = () => {
	const API = window.appConfig.API;
	const { eventExpenseId, eventId } = useParams();
	const navigate = useNavigate();
	const memberId = sessionStorage.getItem("MemberId");

	const [expense, setExpense] = useState({
		expenseName: "",
		expenseAmount: "",
	});

	const { expenseName, expenseAmount } = expense;

	const fetchData = async () => {
		try {
			const res = await axios.get(
				`${API}/EventExpense/GetExpenseSingle/${eventExpenseId}`
			);
			setExpense(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [eventExpenseId]);

	const onInputChange = (e) => {
		setExpense({ ...expense, [e.target.name]: e.target.value });
	};

	const submitExpense = async (e) => {
		try {
			e.preventDefault();

			const res = await axios.put(
				`${API}/EventExpense/EditEventExpense/${eventExpenseId}`,
				{
					eventExpenseId: eventExpenseId,
					eventId: eventId,
					expenseName: expenseName,
					expenseAmount: expenseAmount,
					addedBy: "tim",
					memberId: memberId,
				}
			);
			navigate(`/add-event-expense/${eventId}`);
		} catch {}
	};

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container">
					<CardTitle title="Edit Event Expense" />
					<Row>
						<Form id="event-form" onSubmit={submitExpense}>
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
											name="expenseName"
											autoComplete="off"
											value={expenseName}
											onChange={(e) => onInputChange(e)}
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
											name="expenseAmount"
											autoComplete="off"
											value={expenseAmount}
											onChange={(e) => onInputChange(e)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<Button type="submit" id="event-btn">
										Update Expense
									</Button>
								</Row>
							</div>
						</Form>
					</Row>
				</Card>
			</Container>
		</Fragment>
	);
};

export default EditEventExpenses;
