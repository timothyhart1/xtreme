import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Button,
	Card,
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

const EditEventExpenses = () => {
	const API = window.appConfig.API;
	const { eventExpenseId, eventId } = useParams();
	const navigate = useNavigate();
	const { memberId } = useMemberId();

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
		fetchData().catch((error) => {
			console.error(error);
		});
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
		} catch(error) {
			console.error(error);
		}
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
											className="form-control dark-event-input"
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
											className="form-control dark-event-input"
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
