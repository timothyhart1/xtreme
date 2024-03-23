import axios from "axios";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Card, Container, Row, Col } from "reactstrap";
import "../../Styles/styles.css";
import CardTitle from "../CardTitle/CardTitle";

const HeroSection = () => {
  const API = window.appConfig.API;
  const [data, setData] = useState({
    upcomingEvents: [],
    totalMembers: 0,
    totalVehicles: 0,
    recentlyCreatedVehicles: [],
  });
  const token = sessionStorage.getItem("Token");

  // Fetch data function
  const fetchData = useCallback(async () => {
    try {
      // Fetch Total Members
      const membersRes = await axios.get(`${API}/Member/GetAllMembers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const totalMembers = membersRes.data.length;

      // Fetch Total Vehicles
      const vehiclesRes = await axios.get(`${API}/Vehicle/GetAllVehicles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const totalVehicles = vehiclesRes.data.length;

      const eventsRes = await axios.get(`${API}/Event/GetFutureEvents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const recentlyCreatedVehicles = await axios.get(
        `${API}/Vehicle/GetAllVehicles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const recentVehicleCreations = recentlyCreatedVehicles.data;

      const upcomingEvents = eventsRes.data;

      setData({
        upcomingEvents,
        totalMembers,
        totalVehicles,
        recentlyCreatedVehicles: recentVehicleCreations, // This line was corrected
      });
    } catch (error) {
      console.error(error);
    }
  }, [API, token]);

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col md="2" style={{}}>
            <Card id="card-container-dashboard" style={{ textAlign: "center" }}>
              <CardTitle title="Total Members" />
              <h1 className="header-blue">{data.totalMembers}</h1>
            </Card>
          </Col>
          <Col md="8" sx={12}>
            <Card id="card-container-dashboard">
              <CardTitle title="Upcoming Event" />
              <div className="header-white">
                {data.upcomingEvents.map((event, index) => (
                  <div key={index} className="text-center mb-4">
                    {" "}
                    <h1>{event.eventName}</h1>
                    <p>{new Date(event.eventDate).toLocaleDateString()}</p>
                    <p>{event.eventDesc}</p>
                    <img
                      src={`${API}/Event/GetEventImage/${event.eventId}`}
                      alt="Event"
                      className="responsive-image"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          <Col md="2" sx={0}>
            <Card id="card-container-dashboard" style={{ textAlign: "center" }}>
              <CardTitle title="Total Vehicles" />
              <h1 className="header-blue">{data.totalVehicles}</h1>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12" sx={12}>
            <Card id="card-container-dashboard">
              <CardTitle title="Recently Added Vehicles" />
              <div className="header-white scroll-container">
                {data.recentlyCreatedVehicles.map((vehicle, index) => (
                  <div key={index} className="vehicle-card">
                    <img
                      src={`${API}/Vehicle/GetVehicleImage/${vehicle.vehicleId}`}
                      alt="Vehicle"
                    />
                    <h1>{vehicle.manufacturer}</h1>
                    <h3>{vehicle.model}</h3>
                    <p>{vehicle.year}</p>
                    <p>Owner: {vehicle.member.name}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default HeroSection;
