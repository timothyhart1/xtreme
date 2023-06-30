import React, { Fragment } from "react";
import "./HeroSection.css";
import { Card, Container } from "reactstrap";
import PageHeader from "../PageHeader/PageHeader";
import CardTitle from "../CardTitle/CardTitle";

const HeroSection = () => {
	return (
		<Fragment>
			<Container fluid={true}>
				<PageHeader header="Home" />
				<Card id="card-container">
					<CardTitle title="Event Details" />
				</Card>
			</Container>
		</Fragment>
	);
};

export default HeroSection;
