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
				<Card className="login-card" id="card-container">
					<Form onSubmit={postLogin}>
						<Label className="form-label" id="event-label">
							Email
						</Label>
						<Input
							type="email"
							placeholder="janedoe@gmail.com"
							id="email"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Label className="form-label" id="event-label">
							Password
						</Label>
						<Input
							type="password"
							placeholder="**********"
							id="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button style={{ marginTop: "10px" }}>Login</Button>
					</Form>
				</Card>
			</Container>
		</Fragment>
	);
};

export default Login;
