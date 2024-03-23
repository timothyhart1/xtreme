import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, Container } from "reactstrap";
import "../../Styles/styles.css";
import CardTitle from "../CardTitle/CardTitle";
import { getMemberId } from "../../Contexts/UserSession";

const MemberVehicles = () => {
  const API = window.appConfig.API;
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("Token");
  const memberId = getMemberId();

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

  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Manufacturer",
      selector: (row) => row.manufacturer,
      sortable: true,
    },
    {
      name: "Model",
      selector: (row) => row.model,
      sortable: true,
    },
    {
      name: "Mileage",
      selector: (row) => row.mileage.toLocaleString(),
      sortable: true,
    },
    {
      name: "Plate",
      selector: (row) => row.plate,
      sortable: true,
    },
    {
      name: "Colour",
      selector: (row) => row.color,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div
          className="event-items-icons text-center align-middle"
          id="event-actions"
        >
          <Link to={`/edit-vehicle/${row.vehicleId}`} id="vehicle-model">
            <button type="button" className="btn btn-info">
              <i>
                <FaRegEdit />
              </i>
            </button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Container fluid>
        <ToastContainer />
        <Card id="card-container" className="card-spacing">
          <CardTitle title="My Vehicles" />
          <CardBody>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Link to={`/add-vehicle`} id="vehicle-model">
                <button type="button" className="btn btn-xo">
                  Add Vehicle
                </button>
              </Link>
            </div>
            {data.length === 0 ? (
              <p style={{ textAlign: "center", color: "#fff" }}>
                You currently have no added vehicles.
              </p>
            ) : (
              <DataTable
                columns={columns}
                data={data}
                fixedHeader
                pagination
                className="data-table-xo"
              />
            )}
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default MemberVehicles;
