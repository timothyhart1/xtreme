import React from "react";
import "./EditProfile.css";
import { Card, Container } from "reactstrap";
import PageHeader from "../PageHeader/PageHeader";

function EditProfile() {
	return (
		<Container fluid={true}>
			<PageHeader header="Edit Profile" />
			<Card id="card-container">
				<h1>hello</h1>
			</Card>
		</Container>
	);
}

export default EditProfile;
