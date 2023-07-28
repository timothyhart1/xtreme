import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import CardTitle from "../CardTitle/CardTitle";
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

const EditVehicle = () => {
	const API = window.appConfig.API;
	const { vehicleId } = useParams();
	const [imageFile, setImageFile] = useState(null);
	const navigate = useNavigate();
	const memberId = sessionStorage.getItem("MemberId");

	const [vehicle, setVehicle] = useState({
		manufacturer: "",
		model: "",
		year: "",
		mileage: null,
		plate: "",
		color: "",
	});

	const { manufacturer, model, year, mileage, plate, color } = vehicle;

	const fetchData = async () => {
		try {
			const res = await axios.get(
				`${API}/Vehicle/GetMemberVehicle/${vehicleId}`
			);
			setVehicle(res.data);
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [vehicleId]);

	const onInputChange = (e) => {
		setVehicle({ ...vehicle, [e.target.name]: e.target.value });
	};

	const submitVehicle = async (e) => {
		try {
			e.preventDefault();
			const requestData = new FormData();
			requestData.append("manufacturer", manufacturer);
			requestData.append("memberId", memberId);
			requestData.append("model", model);
			requestData.append("year", year);
			requestData.append("mileage", mileage);
			requestData.append("plate", plate);
			requestData.append("color", color);

			// Check if imageFile is not null before appending it to FormData
			if (imageFile) {
				requestData.append("vehicleImage", imageFile);
			}

			const queryParams = `manufacturer=${manufacturer}&memberId=${memberId}&model=${model}&year=${year}&color=${color}&mileage=${mileage}&plate=${plate}`;
			const requestUrl = `${API}/Vehicle/EditVehicle/${vehicleId}?${queryParams}`;
			await axios.put(requestUrl, requestData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			// Handle success notification or navigation to another page
		} catch (error) {
			// Handle error and show error notification if needed
		}
	};

	const handleImageChange = (e) => {
		setImageFile(e.target.files[0]);
	};

	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<Card id="card-container">
					<CardTitle title="Edit Vehicle" />
					<Row>
						<Form id="event-form" onSubmit={submitVehicle}>
							<div className="event-container">
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Manufacturer
										</Label>
										<Input
											className="form-control event-input"
											required
											type="text"
											name="manufacturer"
											autoComplete="off"
											value={manufacturer}
											onChange={(e) => onInputChange(e)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label for="examplePassword" id="event-label">
											Model
										</Label>
										<Input
											className="form-control event-input"
											required
											type="text"
											name="model"
											autoComplete="off"
											value={model}
											onChange={(e) => onInputChange(e)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label for="examplePassword" id="event-label">
											Year
										</Label>
										<Input
											className="form-control event-input"
											required
											type="text"
											name="year"
											autoComplete="off"
											value={year}
											onChange={(e) => onInputChange(e)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label for="examplePassword" id="event-label">
											Mileage
										</Label>
										<Input
											className="form-control event-input"
											required
											type="text"
											name="mileage"
											autoComplete="off"
											value={mileage}
											onChange={(e) => onInputChange(e)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label for="examplePassword" id="event-label">
											Colour
										</Label>
										<Input
											className="form-control event-input"
											required
											type="text"
											name="color"
											autoComplete="off"
											value={color}
											onChange={(e) => onInputChange(e)}
										/>
									</FormGroup>
								</Row>
								<Row>
									<FormGroup id="event-form-group">
										<Label className="form-label" id="event-label">
											Image
										</Label>
										<br />
										<img
											src={`${API}/Vehicle/GetVehicleImage/${vehicleId}`}
											alt="event-image"
											className="edit-event-image"
										/>
										<br />
										<br />
										<Input
											type="file"
											className="form-control image-input"
											id="event-image-input"
											onChange={handleImageChange}
										/>
									</FormGroup>
								</Row>
								<Row>
									<Button type="submit" id="event-btn">
										Update Vehicle
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

export default EditVehicle;
