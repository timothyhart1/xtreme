import React, { useState, useEffect, Fragment } from "react";
import "./Register.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {
	Row,
	Col,
	Card,
	Form,
	Label,
	Input,
	CardBody,
	Container,
	CardSubtitle,
	CardText,
	Button,
	FormGroup,
	FormText,
	Table,
	CardHeader,
} from "reactstrap";
import PageHeader from "../../PageHeader/PageHeader";
import CardTitle from "../../CardTitle/CardTitle";
import {
	FaRegTrashAlt,
	FaStar,
	FaRegUser,
	FaRegFilePdf,
	FaRegSave,
	FaRegEdit,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Register = () => {
	return (
		<Fragment>
			<Container fluid={true}>
				<ToastContainer />
				<PageHeader header="Events" />
				<Card id="card-container">
					<CardTitle title="Event Details" />
				</Card>
			</Container>
		</Fragment>
	);
};

export default Register;
