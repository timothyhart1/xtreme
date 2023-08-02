import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, Container, Table } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";

const AuthContainer = () => {
	return (
		<Fragment>
			<Container fluid={true}>
				<div className="hero">
					<div className="form-box">
						<div className="button-box">
							<button type="button" className="toggle-btn">
								Log In
							</button>
							<button type="button" className="toggle-btn">
								Register
							</button>
						</div>
					</div>
				</div>
			</Container>
		</Fragment>
	);
};

export default AuthContainer;
