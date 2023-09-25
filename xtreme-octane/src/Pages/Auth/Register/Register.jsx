import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import { useAuth } from "../Auth";
import CardTitle from "../../CardTitle/CardTitle";
import "../../../Styles/styles.css";

const Register = () => {
	const API = window.appConfig.API;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState("");
	const navigate = useNavigate();
	const auth = useAuth();

	const postLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await axios
				.post(`${API}/User/CreateNewUser`, {
					EmailAddress: email,
					password: password,
				})
				.then((response) => {
					console.log(response.data);
					navigate("/login");
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Fragment>
			<Container fluid={true}>
				<CardTitle title="Register" />
				<Card id="card-container">
					<Form onSubmit={postLogin} id="event-form">
						<div className="event-container">
							<Row>
								<FormGroup id="event-form-group">
									<Label className="form-label" id="event-label">
										Email
									</Label>
									<Input
										className="form-control dark-event-input"
										required
										type="text"
										name="surname"
										style={{ backgroundColor: "#161616 !important" }}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</FormGroup>
							</Row>
							<Row>
								<FormGroup id="event-form-group">
									<Label className="form-label" id="event-label">
										Password
									</Label>
									<Input
										className="form-control dark-event-input"
										required
										type="password"
										name="password"
										onChange={(e) => setPassword(e.target.value)}
									/>
								</FormGroup>
							</Row>
							<Row>
								<FormGroup id="event-form-group">
									<Button
										style={{ marginTop: "15px", marginLeft: "0" }}
										type="submit"
										id="event-btn"
									>
										Login
									</Button>
								</FormGroup>
							</Row>
						</div>
					</Form>
				</Card>
			</Container>
		</Fragment>
	);
};

export default Register;
