import axios from "axios";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Container } from "reactstrap";
import { getMemberId } from "../../Contexts/UserSession";
import CardTitle from "../CardTitle/CardTitle";

const ViewSingleEvent = () => {
  const API = window.appConfig.API;
  const [data, setData] = useState([]);
  const { eventId } = useParams();
  const [vote, setVote] = useState("");
  const memberId = getMemberId();
  const [voteResult, setVoteResult] = useState("");
  const token = sessionStorage.getItem("Token");

  const getMemberVote = useCallback(async () => {
    const res = await axios.get(`${API}/EventVote/MemberEventVote/${eventId}`, {
      params: {
        memberId: memberId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setVoteResult(res.data);
  }, [API, eventId, memberId, token]);

  const handleButtonClick = (value) => {
    setVote(value);
  };

  const eventVote = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      `${API}/EventVote/AddEventVote/${eventId}`,
      {
        memberId: memberId,
        vote: vote,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchData();
    getMemberVote();
    return res;
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/Event/GetSingleEvent/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (error) {}
  }, [API, eventId, token]);

  useEffect(() => {
    fetchData().catch((error) => {
      console.error(error);
    });

    getMemberVote().catch((error) => {
      console.error(error);
    });
  }, [fetchData, getMemberVote]);

  return (
    <Fragment>
      <Container fluid={true}>
        <ToastContainer />
        <Card id="card-container" className="card-spacing">
          <CardTitle title="All Events" />
          <div
            className="event-main-container event-block"
            style={{ display: "inline-flex", width: "auto", margin: "auto" }}
          >
            <div className="event-left" style={{ marginRight: "10px" }}>
              <img
                alt="Sample"
                src={`${API}/Event/GetEventImage/${eventId}`}
                className="event-image-vote"
              />
            </div>
            <div className="event-right" style={{ marginLeft: "10px" }}>
              <h4
                style={{ textAlign: "center", marginTop: "10px" }}
                className="light-headers"
              >
                {data.eventName}
              </h4>
              <hr style={{ color: "#fff" }} />
              <p style={{ textAlign: "center" }} className="light-headers">
                {data.eventDesc}
              </p>
              <hr style={{ color: "#fff" }} />
              <h6 style={{ textAlign: "center" }} className="light-headers">
                Will You Be Attending?
              </h6>
              <form onSubmit={eventVote}>
                <div className="vote-btns" style={{ textAlign: "center" }}>
                  <div className="inner-btn">
                    <Button
                      color="primary"
                      style={{ margin: "5px", width: "100px" }}
                      onClick={() => handleButtonClick("yes")}
                      type="submit"
                      disabled={
                        voteResult.length > 0 && voteResult[0].vote === "yes"
                      }
                    >
                      Yes
                    </Button>
                    {voteResult.length > 0 && voteResult[0].vote === "yes" && (
                      <div className="checkmark-container">
                        <FaCheckCircle id="vote-check" />
                      </div>
                    )}
                  </div>
                  <div className="inner-btn">
                    <Button
                      color="danger"
                      style={{ margin: "5px", width: "100px" }}
                      onClick={() => handleButtonClick("no")}
                      type="submit"
                      disabled={
                        voteResult.length > 0 && voteResult[0].vote === "no"
                      }
                    >
                      No
                    </Button>
                    {voteResult.length > 0 && voteResult[0].vote === "no" && (
                      <div className="checkmark-container">
                        <FaCheckCircle id="vote-check" />
                      </div>
                    )}
                  </div>
                  <div className="inner-btn">
                    <Button
                      color="warning"
                      style={{ margin: "5px", width: "100px" }}
                      onClick={() => handleButtonClick("maybe")}
                      type="submit"
                      disabled={
                        voteResult.length > 0 && voteResult[0].vote === "maybe"
                      }
                    >
                      Maybe
                    </Button>
                    {voteResult.length > 0 &&
                      voteResult[0].vote === "maybe" && (
                        <div className="checkmark-container">
                          <FaCheckCircle id="vote-check" />
                        </div>
                      )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <Link to={"/view-events"}>
            <Button
              style={{
                margin: "5px",
                width: "100px",
                backgroundColor: "#3273b5",
                borderColor: "#3273b5",
              }}
              type="button"
              id="event-btn"
            >
              Back
            </Button>
          </Link>
        </Card>
      </Container>
    </Fragment>
  );
};

export default ViewSingleEvent;
