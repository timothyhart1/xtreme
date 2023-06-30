import React, { useState, Fragment } from "react";
import axios from "axios";
import { Container } from "reactstrap";

const Login = () => {
	const API = window.appConfig.API;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const postLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await axios
				.post(`${API}/User/login`, {
					email: email,
					password: password,
				})
				.then((response) => console.log(response));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Fragment>
			<Container fluid={true}>
				<form onSubmit={postLogin}>
					<label for="email">email</label>
					<input
						type="email"
						placeholder="janedoe@gmail.com"
						id="email"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label for="password">password</label>
					<input
						type="password"
						placeholder="**********"
						id="password"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button>Login</button>
				</form>
			</Container>
		</Fragment>
	);
};

export default Login;
