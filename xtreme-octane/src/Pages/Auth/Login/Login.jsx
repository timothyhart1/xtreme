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

const Login = () => {
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
				.post(`${API}/User/login`, {
					EmailAddress: email,
					password: password,
				})
				.then((response) => {
					console.log(response);
					sessionStorage.setItem("Token", response.data.token);
					sessionStorage.setItem("UserId", response.data.userId);
					sessionStorage.setItem("Email", response.data.email);
					sessionStorage.setItem("MemberId", response.data.memberId);
					setUser(response.data);
					auth.login(response.data);
					navigate("/", { replace: true });
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Fragment>
			<Container fluid={true}>
				<CardTitle title="Login" />
				<Card className="login-card" id="card-container">
					<Form onSubmit={postLogin}>
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
					</Form>
				</Card>
			</Container>
		</Fragment>
	);
};

export default Login;
