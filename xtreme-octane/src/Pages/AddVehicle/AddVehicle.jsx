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

const AddVehicle = () => {
	const API = window.appConfig.API;
	const [manufacturer, setManufacturer] = useState("");
	const [model, setModel] = useState("");
	const [year, setYear] = useState("");
	const [mileage, setMileage] = useState("");
	const [plate, setPlate] = useState("");
	const [colour, setColour] = useState("");
	const [imageFile, setFile] = useState();
	const memberId = sessionStorage.getItem("MemberId");

	const getImage = (e) => {
		setFile(e.target.files[0]);
		console.log(e.target.files[0]);
	};

	const uploadImage = async (e) => {
		e.preventDefault();

		if (
			!manufacturer ||
			!model ||
			!year ||
			!mileage ||
			!plate ||
			!colour ||
			!imageFile
		) {
			return;
		}

		const formData = new FormData();
		formData.append("image", imageFile);

		const queryParameters = new URLSearchParams();
		queryParameters.append("memberId", memberId);
		queryParameters.append("manufacturer", manufacturer);
		queryParameters.append("model", model);
		queryParameters.append("year", year);
		queryParameters.append("mileage", mileage);
		queryParameters.append("plate", plate);
		queryParameters.append("color", colour);

		const res = await axios
			.post(
				`${API}/Vehicle/AddVehicle?${queryParameters.toString()}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			)
			.then((response) => {})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container">
					<CardTitle title="Add Vehicle" />
					<Row>
						<Form onSubmit={uploadImage} id="event-form">
							<div className="event-container">
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Manufacturer
										</Label>
										<Input
											className="form-control dark-event-input"
											required
											type="text"
											name="name"
											autoComplete="off"
											onChange={(e) => setManufacturer(e.target.value)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Model
										</Label>
										<Input
											className="form-control dark-event-input"
											required
											type="text"
											name="name"
											autoComplete="off"
											onChange={(e) => setModel(e.target.value)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Year
										</Label>
										<Input
											className="form-control dark-event-input"
											required
											type="text"
											name="name"
											autoComplete="off"
											onChange={(e) => setYear(e.target.value)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Mileage
										</Label>
										<Input
											className="form-control dark-event-input"
											required
											type="text"
											name="name"
											autoComplete="off"
											onChange={(e) => setMileage(e.target.value)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Plate
										</Label>
										<Input
											className="form-control dark-event-input"
											required
											type="text"
											name="name"
											autoComplete="off"
											onChange={(e) => setPlate(e.target.value)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Color
										</Label>
										<Input
											className="form-control dark-event-input"
											required
											type="text"
											name="name"
											autoComplete="off"
											onChange={(e) => setColour(e.target.value)}
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
											onChange={getImage}
											id="event-image-input"
										/>
									</FormGroup>
								</Row>
								<Row>
									<Button type="submit" id="event-btn">
										Add Vehicle
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

export default AddVehicle;
