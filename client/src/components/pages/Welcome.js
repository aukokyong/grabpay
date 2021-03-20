import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const Welcome = (props) => {
  console.log(props);

  const [nextPage, setNextPage] = useState({
    balance: false,
    transaction: false,
    transfer: false,
  });

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
      <Row className="justify-content-center mb-5">
        <h1>Welcome {props.userInfo.username}</h1>
      </Row>
      <Row className="justify-content-center mb-5">
        <h1>What would you like to do today?</h1>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col sm="auto">
          <Button
            name="balance"
            onClick={(e) => {
              handleClickNextPage(e);
            }}
          >
            View Account Balance
          </Button>
        </Col>
        <Col sm="auto">
          <Button
            name="transaction"
            onClick={(e) => {
              handleClickNextPage(e);
            }}
          >
            View Transaction History
          </Button>
        </Col>
        <Col sm="auto">
          <Button
            name="transfer"
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
