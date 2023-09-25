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
					<h1>Unauthorized :/</h1>
				</Card>
			</Container>
		</Fragment>
	);
};

export default AuthGuard;
