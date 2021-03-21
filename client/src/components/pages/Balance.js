import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const Balance = (props) => {
  // console.log(props);
  const [accountBalance, setAccountBalance] = useState(0);
  const [nextPage, setNextPage] = useState({
    transaction: false,
    transfer: false,
  });

  useEffect(() => {
    axios
      .get("/balance/" + props.userInfo._id)
      .then((response) => {
        console.log(response.data);
        setAccountBalance(
          (response.data.accountBalance_cents / 100).toFixed(2)
        );
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const handleClickNextPage = (event) => {
    console.log(event.target.name);
    setNextPage((state) => {
      return { ...state, [event.target.name]: true };
    });
  };
  if (nextPage.transaction) {
    return <Redirect to="/transaction" />;
  }
  if (nextPage.transfer) {
    return <Redirect to="/transfer" />;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <h1>Account Balance:</h1>
      </Row>
      <Row className="justify-content-center mb-5">
        <h1>SGD ${accountBalance}</h1>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col xs="auto">
          <Button
            name="transaction"
            className="mb-3 mt-3"
            onClick={(e) => {
              handleClickNextPage(e);
            }}
          >
            View Transaction History
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

export default Balance;
