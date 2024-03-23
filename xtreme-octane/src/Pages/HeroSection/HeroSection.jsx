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
      console.log(totalMembers);

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
      const upcomingEvents = eventsRes.data;
      console.log(upcomingEvents);
      setData({
        upcomingEvents,
        totalMembers,
        totalVehicles,
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
        <Row></Row>
      </Container>
    </Fragment>
  );
};

export default HeroSection;
