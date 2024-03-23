import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
import { getMemberId } from "../../Contexts/UserSession";
import "../../Styles/styles.css";
import CardTitle from "../CardTitle/CardTitle";

const AddLapTime = () => {
  const API = window.appConfig.API;
  const memberId = getMemberId();
  const [vehicleId, setVehicleId] = useState("");
  const [lapTimeMinutes, setLapTimeMinutes] = useState("");
  const [lapTimeSeconds, setLapTimeSeconds] = useState("");
  const [lapTimeMiliSeconds, setLapTimeMiliSeconds] = useState("");
  const [category, setCategory] = useState("");
  const [conditions, setConditions] = useState("");
  const [tyre, setTyre] = useState("");
  const [vehicleClass, setVehicleClass] = useState("");
  const [lapTimeScreenshot, setLapTimeScreenshot] = useState(null);
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("Token");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${API}/Vehicle/GetAllMemberVehicles/${memberId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData().catch((error) => {
      console.error(error);
    });
  }, [API, memberId, token]);

  const addLapTime = async (e) => {
    e.preventDefault();
    if (
      !vehicleId ||
      !lapTimeMinutes ||
      !lapTimeSeconds ||
      !lapTimeMiliSeconds ||
      !category ||
      !conditions ||
      !tyre ||
      !vehicleClass ||
      !lapTimeScreenshot
    ) {
      alert("Please fill in all fields including the lap time screenshot.");
      return;
    }

    const formData = new FormData();
    formData.append("lapTimeScreenshot", lapTimeScreenshot);

    const queryParameters = new URLSearchParams();
    queryParameters.append("memberId", memberId);
    queryParameters.append("vehicleId", vehicleId);
    queryParameters.append("lapTimeMinutes", lapTimeMinutes);
    queryParameters.append("lapTimeSeconds", lapTimeSeconds);
    queryParameters.append("lapTimeMiliSeconds", lapTimeMiliSeconds);
    queryParameters.append("category", category);
    queryParameters.append("conditions", conditions);
    queryParameters.append("tyre", tyre);
    queryParameters.append("vehicleClass", vehicleClass);
    queryParameters.append("verified", true);

    try {
      await axios.post(
        `${API}/MemberTrackTime/AddNewTrackTime?${queryParameters.toString()}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setVehicleId("");
      setLapTimeMinutes("");
      setLapTimeSeconds("");
      setLapTimeMiliSeconds("");
      setCategory("");
      setConditions("");
      setTyre("");
      setVehicleClass("");
      setLapTimeScreenshot(null);
      alert("Lap Time Added.");
    } catch (error) {
      console.error(error);
      alert("Error adding lap time.");
    }
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    setLapTimeScreenshot(file);
  };

  return (
    <Fragment>
      <Container fluid={true}>
        <ToastContainer />
        <Card id="card-container">
          <CardTitle title="Add Lap Time" />
          <Row>
            <Form onSubmit={addLapTime} id="event-form">
              <div className="event-container">
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Vehicle
                    </Label>
                    <select
                      className="form-control dark-event-input"
                      required
                      autoComplete="off"
                      name="vehicleId"
                      onChange={(e) => setVehicleId(e.target.value)}
                      value={vehicleId}
                    >
                      <option value="">Select a Vehicle</option>
                      {data.map((vehicle) => (
                        <option
                          key={vehicle.vehicleId}
                          value={vehicle.vehicleId}
                        >
                          {vehicle.manufacturer} {vehicle.model}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Lap Time Minutes
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      autoComplete="off"
                      name="lapTimeMinutes"
                      onChange={(e) => setLapTimeMinutes(e.target.value)}
                      value={lapTimeMinutes}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Lap Time Seconds
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      autoComplete="off"
                      name="lapTimeSeconds"
                      onChange={(e) => setLapTimeSeconds(e.target.value)}
                      value={lapTimeSeconds}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Lap Time Miliseconds
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      autoComplete="off"
                      name="lapTimeMiliSeconds"
                      onChange={(e) => setLapTimeMiliSeconds(e.target.value)}
                      value={lapTimeMiliSeconds}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Category
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="category"
                      autoComplete="off"
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Conditions
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="conditions"
                      autoComplete="off"
                      onChange={(e) => setConditions(e.target.value)}
                      value={conditions}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Tyre
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="tyre"
                      autoComplete="off"
                      onChange={(e) => setTyre(e.target.value)}
                      value={tyre}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Vehicle Class
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="vehicleClass"
                      autoComplete="off"
                      onChange={(e) => setVehicleClass(e.target.value)}
                      value={vehicleClass}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Lap Time Screenshot
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="file"
                      name="lapTimeScreenshot"
                      accept="image/*"
                      onChange={handleScreenshotChange}
                    />
                  </FormGroup>
                </Row>
              </div>
              <div className="btn-container">
                <Link to={"/scribante"}>
                  <Button type="button" id="event-btn">
                    Back
                  </Button>
                </Link>
                <Button
                  type="submit"
                  id="event-btn"
                  style={{
                    backgroundColor: "#ffc107",
                    color: "#000",
                    borderColor: "#c79d18",
                  }}
                >
                  Add Lap Time
                </Button>
              </div>
            </Form>
          </Row>
        </Card>
      </Container>
    </Fragment>
  );
};

export default AddLapTime;
