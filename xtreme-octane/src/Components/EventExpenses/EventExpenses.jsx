import React, { useState, useEffect, Fragment } from "react";
import "./EventExpenses.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../PageHeader/PageHeader";
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

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/EventExpenses/${eventId}`);
				setData(res.data);
				console.log(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<PageHeader header="Events" />
				<Card id="card-container">
					<CardTitle title="Add Expense" />
					<Row>
						<Form id="event-form">
							<div className="event-container">
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Event Name
										</Label>
										<Input
											className="form-control event-input"
											required
											type="text"
											name="name"
											autoComplete="off"
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label for="examplePassword" id="event-label">
											Event Description
										</Label>
										<textarea
											type="text"
											rows="10"
											className="form-control event-input"
											required={true}
											autoComplete="off"
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label for="examplePassword" id="event-label">
											Event Image
										</Label>
										<Input
											type="file"
											className="form-control image-input"
											required={true}
											id="event-image-input"
										/>
									</FormGroup>
								</Row>
								<Row>
									<Button type="submit" id="event-btn">
										Add Event
									</Button>
								</Row>
							</div>
						</Form>
					</Row>
				</Card>
				<Card id="card-container" className="card-spacing">
					<CardTitle title="Event Expenses" />
					<CardBody>
						<Table id="event-table" bordered responsive>
							<thead>
								<tr>
									<th className="text-center align-middle">#</th>
									<th className="text-center align-middle">Event Name</th>
									<th className="text-center align-middle">
										Event Description
									</th>
									<th className="text-center align-middle">Added By</th>
									<th className="text-center align-middle">Actions</th>
								</tr>
							</thead>
							<tbody>
								{data.map((item, index) => {
									return (
										<tr key={index}>
											<th scope="row" className="text-center align-middle">
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

											<td
												className="event-items-icons text-center align-middle"
												id="event-actions"
											>
												<Link to={`edit-event/${item.eventId}`}>
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
													eventName={item.eventName}
													eventId={item.eventId}
													id="event-btns"
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
