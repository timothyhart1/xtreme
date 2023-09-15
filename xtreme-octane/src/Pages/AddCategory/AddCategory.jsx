import React, { useState, Fragment } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Row,
	Card,
	Form,
	Label,
	Input,
	Container,
	Button,
	FormGroup,
} from "reactstrap";
import CardTitle from "../CardTitle/CardTitle";
import "../../Styles/styles.css";
import { Link, useNavigate } from "react-router-dom";

const AddCategory = ({ history }) => {
	const API = window.appConfig.API;
	const [expenseCategory, setExpenseCategory] = useState("");
	const navigate = useNavigate();

	const addCategory = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post(`${API}/EventExpense/AddCategory`, {
				category: expenseCategory,
			});

			setTimeout(() => {
				navigate(-1);
			}, 2000);
			toast.success("Category added successfully");
		} catch (error) {
			console.error(error);
			toast.error("An error occurred while adding the category");
		}
	};

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container">
					<CardTitle title="Add Category" />
					<Row>
						<Form onSubmit={addCategory} id="event-form">
							<div className="event-container">
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Category Name
										</Label>
										<Input
											className="form-control dark-event-input"
											required
											type="text"
											name="name"
											autoComplete="off"
											value={expenseCategory}
											onChange={(e) => setExpenseCategory(e.target.value)}
										/>
									</FormGroup>
								</Row>
							</div>
							<Button type="submit" id="event-btn">
								Add Category
							</Button>
						</Form>
					</Row>
				</Card>
			</Container>
		</Fragment>
	);
};

export default AddCategory;
