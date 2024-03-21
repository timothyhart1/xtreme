import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
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
import { useMemberId } from "../../Contexts/MemberIdContext";
import "../../Styles/styles.css";
import CardTitle from "../CardTitle/CardTitle";

function EditProfile() {
  const API = window.appConfig.API;
  const { memberId } = useMemberId();
  const [profilePicture, setProfilePicture] = useState(null);
  const token = sessionStorage.getItem("Token");

  const [profile, setProfile] = useState({
    email: "",
    name: "",
    surname: "",
    city: "",
    phoneNumber: "",
    gender: "",
  });

  const { name, surname, city, phoneNumber, gender } = profile;
  const onInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${API}/Member/GetSingleMember/${memberId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(res.data);
      } catch (error) {}
    }
    fetchData().catch((error) => {
      console.error(error);
    });
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Image", profilePicture);
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("city", city);
    formData.append("phoneNumber", phoneNumber);
    formData.append("gender", gender);
    formData.append("deleted", false);

    try {
    } catch (error) {
      console.error(error);
    }
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  return (
    <Fragment>
      <Container fluid={true}>
        <Card id="card-container">
          <CardTitle title="Edit Profile" />
          <Row>
            <Form onSubmit={updateProfile} id="event-form">
              <div className="event-container">
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      First Name
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="name"
                      autoComplete="off"
                      value={name}
                      onChange={(e) => onInputChange(e)}
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
                      autoComplete="off"
                      value={surname}
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      City
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="city"
                      autoComplete="off"
                      value={city}
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Phone Number
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="phoneNumber"
                      autoComplete="off"
                      value={phoneNumber}
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Gender
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="gender"
                      autoComplete="off"
                      value={gender}
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Profile Picture
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="file"
                      name="profilePicture"
                      accept="image/*"
                      onChange={handleScreenshotChange}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <Button
                    type="submit"
                    id="event-btn"
                    style={{ marginLeft: "0" }}
                  >
                    Update Profile
                  </Button>
                </Row>
              </div>
            </Form>
          </Row>
        </Card>
      </Container>
    </Fragment>
  );
}

export default EditProfile;
