import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import {
	Card,
	Container,
	Input,
	Row,
	Form,
	FormGroup,
	Label,
	Button,
} from "reactstrap";
import PageHeader from "../PageHeader/PageHeader";
import axios from "axios";

function EditProfile() {
	const API = window.appConfig.API;
	const memberId = sessionStorage.getItem("MemberId");

	const [profile, setProfile] = useState({
		email: "",
		name: "",
		surname: "",
		city: "",
		phoneNumber: "",
		gender: "",
	});

	const { email, name, surname, city, phoneNumber, gender } = profile;

	const onInputChange = (e) => {
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get(`${API}/Member/Single-Member/${memberId}`);
				setProfile(res.data);
				console.log(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	const updateProfile = async (e) => {
		e.preventDefault();

		const requestData = {
			email: email,
			name: name,
			surname: surname,
			city: city,
			phoneNumber: phoneNumber,
			gender: gender,
			deleted: false,
		};

		const requestUrl = `${API}/Member/Edit-Profile/${memberId}`;
		const req = await axios.put(requestUrl, requestData);
	};

	return (
		<Container fluid={true}>
			<PageHeader header="Edit Profile" />
			<Card id="card-container">
				<Form onSubmit={updateProfile}>
					<Row>
						<FormGroup id="event-form-group">
							<Label className="form-label" id="event-label">
								First Name
							</Label>
							<Input
								className="form-control event-input"
								required
								type="text"
								name="name"
								autoComplete="off"
								value={name}
								onChange={(e) => onInputChange(e)}
							/>
						</FormGroup>
					</Row>
					<Row>
						<FormGroup id="event-form-group">
							<Label className="form-label" id="event-label">
								Last Name
							</Label>
							<Input
								className="form-control event-input"
								required
								type="text"
								name="surname"
								autoComplete="off"
								value={surname}
								onChange={(e) => onInputChange(e)}
							/>
						</FormGroup>
					</Row>
					<Row>
						<FormGroup id="event-form-group">
							<Label className="form-label" id="event-label">
								City
							</Label>
							<Input
								className="form-control event-input"
								required
								type="text"
								name="city"
								autoComplete="off"
								value={city}
								onChange={(e) => onInputChange(e)}
							/>
						</FormGroup>
					</Row>
					<Row>
						<FormGroup id="event-form-group">
							<Label className="form-label" id="event-label">
								Phone Number
							</Label>
							<Input
								className="form-control event-input"
								required
								type="text"
								name="phoneNumber"
								autoComplete="off"
								value={phoneNumber}
								onChange={(e) => onInputChange(e)}
							/>
						</FormGroup>
					</Row>
					<Row>
						<FormGroup id="event-form-group">
							<Label className="form-label" id="event-label">
								Gender
							</Label>
							<Input
								className="form-control event-input"
								required
								type="text"
								name="gender"
								autoComplete="off"
								value={gender}
								onChange={(e) => onInputChange(e)}
							/>
						</FormGroup>
					</Row>
					<Row>
						<Button type="submit" id="event-btn-card">
							Update Profile
						</Button>
					</Row>
				</Form>
			</Card>
		</Container>
	);
}

export default EditProfile;
