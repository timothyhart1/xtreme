import axios from "axios";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const AddVehicle = () => {
  const API = window.appConfig.API;
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [plate, setPlate] = useState("");
  const [colour, setColour] = useState("");
  const [imageFile, setFile] = useState();
  const { memberId } = useMemberId();

  const getImage = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async (e) => {
    e.preventDefault();

    if (
      !manufacturer ||
      !model ||
      !year ||
      !mileage ||
      !plate ||
      !colour ||
      !imageFile
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("memberId", memberId);
    formData.append("manufacturer", manufacturer);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("mileage", mileage);
    formData.append("plate", plate);
    formData.append("color", colour);
    formData.append("image", imageFile);

    try {
      const response = await axios.post(`${API}/Vehicle/AddVehicle`, formData);
      toast.success("Vehicle added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the vehicle.");
    }
  };

  return (
    <Fragment>
      <Container fluid={true}>
        <ToastContainer />
        <Card id="card-container">
          <CardTitle title="Add Vehicle" />
          <Row>
            <Form onSubmit={uploadImage} id="event-form">
              <div className="event-container">
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Manufacturer
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="name"
                      autoComplete="off"
                      onChange={(e) => setManufacturer(e.target.value)}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Model
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="name"
                      autoComplete="off"
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Year
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="name"
                      autoComplete="off"
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Mileage
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="name"
                      autoComplete="off"
                      onChange={(e) => setMileage(e.target.value)}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Plate
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="name"
                      autoComplete="off"
                      onChange={(e) => setPlate(e.target.value)}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Color
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="name"
                      autoComplete="off"
                      onChange={(e) => setColour(e.target.value)}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label for="examplePassword" id="event-label">
                      Vehicle Image
                    </Label>
                    <Input
                      type="file"
                      className="form-control image-input"
                      onChange={getImage}
                      id="event-image-input"
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Link to={"/member-vehicles"}>
                      <Button
                        style={{
                          marginRight: "5px",
                          width: "100px",
                          backgroundColor: "#3273b5",
                          borderColor: "#3273b5",
                        }}
                        type="button"
                        id="blue-event-btn"
                      >
                        Back
                      </Button>
                    </Link>
                    <Button type="submit" id="event-btn">
                      Add Vehicle
                    </Button>
                  </FormGroup>
                </Row>
              </div>
            </Form>
          </Row>
        </Card>
      </Container>
    </Fragment>
  );
};

export default AddVehicle;
