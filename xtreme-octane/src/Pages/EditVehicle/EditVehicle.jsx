import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
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

const EditVehicle = () => {
	const API = window.appConfig.API;
	const { vehicleId } = useParams();
	const [imageFile, setImageFile] = useState(null);
	const navigate = useNavigate();
	const { memberId } = useMemberId();
	const token = sessionStorage.getItem("Token");

	const [vehicle, setVehicle] = useState({
		manufacturer: "",
		model: "",
		year: "",
		mileage: null,
		plate: "",
		color: "",
		hasImage: null,
	});

	const { manufacturer, model, year, mileage, plate, color, hasImage } =
		vehicle;

	const fetchData = async () => {
		try {
			const res = await axios.get(
				`${API}/Vehicle/GetMemberVehicle/${vehicleId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			setVehicle(res.data);
		} catch (error) {}
	};

	useEffect(() => {
		fetchData().catch((error) => {
			console.error(error);
		});
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

			if (imageFile) {
				requestData.append("vehicleImage", imageFile);
			}

			const queryParams = `manufacturer=${manufacturer}&memberId=${memberId}&model=${model}&year=${year}&color=${color}&mileage=${mileage}&plate=${plate}`;
			const requestUrl = `${API}/Vehicle/EditVehicle/${vehicleId}?${queryParams}`;
			await axios.put(requestUrl, requestData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			});

			toast.success("Vehicle updated successfully!");
			navigate("/member-vehicles");
		} catch (error) {
			console.error(error);
			toast.error("An error occurred while updating the vehicle.");
		}
	};

	const handleImageChange = (e) => {
		setImageFile(e.target.files[0]);
	};

	const deleteVehicleImage = async (vehicleId) => {
		const res = await axios.delete(
			`${API}/Vehicle/DeleteVehicleImage/${vehicleId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		toast.success("Vehicle Image Removed");
		navigate("/member-vehicles");
	};

	return (
		<Fragment>
			<Container fluid={true}>
				<Card id="card-container-edit-vehicle">
					{vehicle && vehicle.hasImage && (
						<div className="image-container" style={{ marginTop: "-20px" }}>
							<img
								src={`${API}/Vehicle/GetVehicleImage/${vehicleId}`}
								alt="event-image"
								className="edit-vehicle-image"
							/>
							<div className="gradient-overlay"></div>
							<div className="text-overlay">
								<p>
									{year} {manufacturer} {model}
								</p>
							</div>
						</div>
					)}

					<Row>
						<CardBody>
							<CardTitle title="Edit Vehicle" />
							<Form id="event-form" onSubmit={submitVehicle}>
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
												className="form-control dark-event-input"
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
												className="form-control dark-event-input"
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
												className="form-control dark-event-input"
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
												className="form-control dark-event-input"
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
										<Button
											type="button"
											id="event-btn"
											onClick={() => deleteVehicleImage(vehicleId)}
										>
											Delete Image
										</Button>
									</Row>
									<br />
									<Row>
										<div className="btn-container" style={{ paddingLeft: "0" }}>
											<Link to={"/member-vehicles"}>
												<Button
													id="event-btn"
													style={{
														backgroundColor: "#3273b5",
														borderColor: "#3273b5",
													}}
												>
													Back
												</Button>
											</Link>
											<Button type="submit" id="event-btn">
												Update Vehicle
											</Button>
										</div>
									</Row>
								</div>
							</Form>
						</CardBody>
					</Row>
				</Card>
			</Container>
		</Fragment>
	);
};

export default EditVehicle;
