import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Col, Row, Button } from "react-bootstrap";
import DetailsRow from "./transaction/DetailsRow";
import { Redirect } from "react-router-dom";

const Transaction = (props) => {
  // console.log(props);

  const [transactionDetails, setTransactionDetails] = useState([]);
  const [nextPage, setNextPage] = useState({
    balance: false,
    transfer: false,
  });
  // console.log(transaction);

  useEffect(() => {
    axios
      .get("/transaction/" + props.userInfo._id)
      .then((response) => {
        console.log(response);
        setTransactionDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClickNextPage = (event) => {
    console.log(event.target.name);
    setNextPage((state) => {
      return { ...state, [event.target.name]: true };
    });
  };
  if (nextPage.balance) {
    return <Redirect to="/balance" />;
  }
  if (nextPage.transfer) {
    return <Redirect to="/transfer" />;
  }

  return (
    <Container>
      <Row className="justify-content-center mb-5">
        <h1>Transaction History</h1>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Date</th>
            <th>Transaction</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
          </tr>
        </thead>
        <tbody>
          {transactionDetails.map((transaction, index) => {
            return (
              <DetailsRow
                key={transaction._id}
                index={index}
                transaction={transaction}
                currentUser={props.userInfo._id}
              />
            );
          })}
        </tbody>
      </Table>

      <Row className="justify-content-center mb-5 mt-5">
        <Col xs="auto">
          <Button
            name="balance"
            className="mb-3 mt-3"
            onClick={(e) => {
              handleClickNextPage(e);
            }}
          >
            View Account Balance
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            name="transfer"
            className="mb-3 mt-3"
            onClick={(e) => {
              handleClickNextPage(e);
            }}
          >
            Send Payment
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Transaction;
