import axios from "axios";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Card, Container, Row, Col } from "reactstrap";
import "../../Styles/styles.css";
import CardTitle from "../CardTitle/CardTitle";
import { Button, CardBody, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";

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
        headers: { Authorization: `Bearer ${token}` },
      });
      const upcomingEvents = eventsRes.data;

      // Now that upcomingEvents is fetched, proceed to fetch votes for each event
      const eventsWithVotes = await Promise.all(
        upcomingEvents.map(async (event) => {
          try {
            const voteRes = await axios.get(
              `${API}/EventVote/GetEventVotes/${event.eventId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            return { ...event, yesVotes: voteRes.data.yesVotes };
          } catch (error) {
            console.error(error);
            // Assuming 0 as default if there's an error
            return { ...event, yesVotes: 0 };
          }
        })
      );

      const recentlyCreatedVehicles = await axios.get(
        `${API}/Vehicle/GetAllVehicles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData((prevData) => ({
        ...prevData,
        upcomingEvents: eventsWithVotes,
        totalMembers: membersRes.data.length,
        totalVehicles: vehiclesRes.data.length,
        recentlyCreatedVehicles: recentlyCreatedVehicles.data,
      }));
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
              <CardTitle
                title={
                  data.upcomingEvents.length == 1
                    ? "Upcoming Event"
                    : "Upcoming Events"
                }
              />
              <CardBody id="event-card-body">
                {data.upcomingEvents.map((item, index) => (
                  <Card
                    key={index}
                    id="event-card-container"
                    className="event-card-item"
                  >
                    <div className="image-wrapper">
                      {item.yesVotes > 0 && (
                        <div className="attendance-overlay">
                          {item.yesVotes}{" "}
                          {item.yesVotes > 1
                            ? "people attending"
                            : "person attending"}
                        </div>
                      )}
                      <img
                        alt="Sample"
                        src={`${API}/Event/GetEventImage/${item.eventId}`}
                        className="event-image"
                      />
                    </div>
                    <CardBody>
                      <CardSubtitle className="mb-2 event-header event-centre">
                        {item.eventName}
                      </CardSubtitle>
                      <CardSubtitle className="mb-2 event-header event-centre">
                        {item.eventDate.slice(0, 10)}
                      </CardSubtitle>
                      <div className="event-btn-container">
                        <Link
                          to={`/view-event/${item.eventId}`}
                          style={{ width: "100%" }}
                        >
                          <Button id="event-btn-card">View Event</Button>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </CardBody>
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
