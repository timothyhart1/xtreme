import React, { Fragment } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "reactstrap";

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
