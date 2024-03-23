import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, Container } from "reactstrap";
import "../../Styles/styles.css";
import CardTitle from "../CardTitle/CardTitle";

const EditMemberRole = () => {
  const API = window.appConfig.API;
  const [data, setData] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const token = sessionStorage.getItem("Token");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${API}/Member/GetAllMembers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData().catch((error) => {
      console.error(error);
    });
  }, [API, updateTrigger]);

  const updateMemberRole = async (userId, newRole) => {
    try {
      const res = await axios.put(
        `${API}/Member/UpdateMemberRole/${userId}`, // Pass userId in the URL
        newRole, // Pass newRole as the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Ensure correct content type
          },
        }
      );
      setUpdateTrigger(updateTrigger + 1); // Trigger state update or refresh
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Surname",
      selector: (row) => row.surname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Date Joined",
      id: "createDate",
      selector: (row) => row.createDate.slice(0, 10),
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      cell: (row) => (
        <select
          value={row.role}
          onChange={(e) => updateMemberRole(row.userId, e.target.value)}
          className="form-control"
        >
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      ),
    },
  ];

  return (
    <Fragment>
      <Container fluid={true}>
        <ToastContainer />
        <Card id="card-container" className="card-spacing">
          <CardTitle title="Edit Member Role" />
          <CardBody>
            <DataTable
              columns={columns}
              data={data}
              fixedHeader
              pagination
              className="data-table-xo"
            />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default EditMemberRole;
