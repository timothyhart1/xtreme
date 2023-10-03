import React, { useState, Fragment } from "react";
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

const AuthGuard = () => {
	return (
		<Fragment>
			<Container fluid={true}>
				<Card id="card-container">
					<h1 style={{ textAlign: "center", color: "#fff" }}>
						Unauthorized :/
					</h1>
					<p style={{ display: "none" }}>We Silenced You, Tsek!</p>
					<p style={{ display: "none" }}>No more street raving for you</p>
				</Card>
			</Container>
		</Fragment>
	);
};

export default AuthGuard;
