import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
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

const EditEventExpenses = () => {
  const API = window.appConfig.API;
  const { eventExpenseId, eventId } = useParams();
  const navigate = useNavigate();
  const memberId = getMemberId();
  const token = sessionStorage.getItem("Token");

  const [expense, setExpense] = useState({
    expenseName: "",
    expenseAmount: "",
  });

  const { expenseName, expenseAmount } = expense;

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${API}/EventExpense/GetExpenseSingle/${eventExpenseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExpense(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.error(error);
    });
  }, [eventExpenseId]);

  const onInputChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const submitExpense = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.put(
        `${API}/EventExpense/EditEventExpense/${eventExpenseId}`,
        {
          eventExpenseId: eventExpenseId,
          eventId: eventId,
          expenseName: expenseName,
          expenseAmount: expenseAmount,
          addedBy: "tim",
          memberId: memberId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notify("success");
      navigate(`/add-event-expense/${eventId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const notify = (toastname) => {
    switch (toastname) {
      case "success":
        toast.success("Expense Updated.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        break;
      case "failure":
        toast.error("Error Updating Expense.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        break;
    }
  };

  return (
    <Fragment>
      <Toaster />
      <Container fluid={true}>
        <Card id="card-container">
          <CardTitle title="Edit Event Expense" />
          <Row>
            <Form id="event-form" onSubmit={submitExpense}>
              <div className="event-container">
                <Row>
                  <FormGroup id="event-form-group">
                    <Label className="form-label" id="event-label">
                      Expense Name
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="expenseName"
                      autoComplete="off"
                      value={expenseName}
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup id="event-form-group">
                    <Label for="examplePassword" id="event-label">
                      Expense Amount
                    </Label>
                    <Input
                      className="form-control dark-event-input"
                      required
                      type="text"
                      name="expenseAmount"
                      autoComplete="off"
                      value={expenseAmount}
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <Button type="submit" id="event-btn">
                    Update Expense
                  </Button>
                </Row>
              </div>
            </Form>
          </Row>
        </Card>
      </Container>
    </Fragment>
  );
};

export default EditEventExpenses;
