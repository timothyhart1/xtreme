import axios from "axios";
import React, { Fragment, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import "../../Styles/styles.css";
import CardTitle from "../CardTitle/CardTitle";

const AddCategory = ({ history }) => {
	const API = window.appConfig.API;
	const [expenseCategory, setExpenseCategory] = useState("");
	const navigate = useNavigate();
	const token = sessionStorage.getItem("Token");

	const addCategory = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post(
				`${API}/EventExpense/AddCategory`,
				{
					category: expenseCategory,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			notify("success");
			navigate(-1);
		} catch (error) {
			notify("failure");
		}
	};

	const notify = (toastname) => {
		switch (toastname) {
			case "success":
				toast.success("Category Added.", {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 3000,
				});
				break;
			case "failure":
				toast.error("Error Adding Category.", {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 3000,
				});
				break;
		}
	};

	return (
		<Fragment>
			<Container fluid={true}>
				<Toaster />
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
