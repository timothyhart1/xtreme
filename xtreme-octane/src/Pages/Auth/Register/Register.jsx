import axios from "axios";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import "../../../Styles/styles.css";
import CardTitle from "../../CardTitle/CardTitle";
import { useAuth } from "../Auth";
import { loginUser } from "../Auth";

const Register = () => {
  const API = window.appConfig.API;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const postRegistration = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.post(`${API}/User/CreateNewUser`, {
        emailAddress: email,
        password: password,
        firstName: firstName,
        lastName: surname,
        phoneNumber: phoneNumber,
      });

      if (userResponse.status === 200 || userResponse.status === 201) {
        await loginUser(email, password, API, auth, navigate);
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <Fragment>
      <Container fluid={true}>
        <CardTitle title="Register" />
        <Card id="card-container-login-register">
          <Form onSubmit={postRegistration} id="event-form" autocomplete="off">
            <div className="event-container">
              <Row>
                <Label className="form-label" id="event-label">
                  Email
                </Label>
                <Input
                  className="form-control dark-event-input"
                  required
                  autoComplete="off"
                  type="text"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Row>
              <Row>
                <FormGroup id="event-form-group">
                  <Label className="form-label" id="event-label">
                    Password
                  </Label>
                  <Input
                    required
                    autoComplete="off"
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup id="event-form-group">
                  <Label className="form-label" id="event-label">
                    First Name
                  </Label>
                  <Input
                    className="form-control dark-event-input"
                    required
                    type="text"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup id="event-form-group">
                  <Label className="form-label" id="event-label">
                    Last Name
                  </Label>
                  <Input
                    className="form-control dark-event-input"
                    required
                    type="text"
                    name="surname"
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup id="event-form-group">
                  <Label className="form-label" id="event-label">
                    Cell
                  </Label>
                  <Input
                    className="form-control dark-event-input"
                    required
                    type="text"
                    name="phoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    Register
                  </Button>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup id="event-form-group">
                  <h6 style={{ color: "#fff" }}>
                    Already have an account?{" "}
                    <a
                      href="/login"
                      style={{ textDecoration: "none", color: "#3273b5" }}
                    >
                      Sign in
                    </a>
                  </h6>
                </FormGroup>
              </Row>
            </div>
          </Form>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Register;
