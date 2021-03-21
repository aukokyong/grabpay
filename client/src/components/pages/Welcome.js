import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const Welcome = (props) => {
  console.log(props);

  const [nextPage, setNextPage] = useState({
    balance: false,
    transaction: false,
    transfer: false,
  });

  useEffect(() => {
    axios
      .get("/balance/update/" + props.userInfo._id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.userInfo._id]);

  const handleClickNextPage = (event) => {
    console.log(event.target.name);
    setNextPage((state) => {
      return { ...state, [event.target.name]: true };
    });
  };
  if (nextPage.balance) {
    return <Redirect to="/balance" />;
  }
  if (nextPage.transaction) {
    return <Redirect to="/transaction" />;
  }
  if (nextPage.transfer) {
    return <Redirect to="/transfer" />;
  }

  return (
    <Container>
      <h1 className="text-center mb-5">Welcome {props.userInfo.username}</h1>
      <h1 className="text-center mb-5">What would you like to do today?</h1>

      <Row className="justify-content-center mb-5">
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

export default Welcome;
