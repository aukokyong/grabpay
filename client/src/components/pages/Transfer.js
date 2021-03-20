import { useState } from "react";
import axios from "axios";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const Transfer = (props) => {
  // console.log(props);

  const [formData, setFormData] = useState({
    creditorUsername: "",
    debtorID: props.userInfo._id,
    debtorUsername: props.userInfo.username,
    transactionAmount_dollars: "",
    description: "",
  });
  const [isReceiverValid, setIsReceiverValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ user: "" });
  const [nextPage, setNextPage] = useState({
    balance: false,
    transaction: false,
  });

  // console.log(formData);

  const handleChangeForUsernameField = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
    setErrorMsg({ user: "" });
    setIsReceiverValid(false);
  };

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  const handleCheck = (event) => {
    console.log("clicked");
    event.preventDefault();

    if (formData.creditorUsername === props.userInfo.username) {
      setErrorMsg({ user: "Unable to send to this account" });
    } else {
      axios
        .post("/transfer/check", { username: formData.creditorUsername })
        .then((response) => {
          console.log(response.data);
          setIsReceiverValid(response.data);
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status == 401) {
            setIsReceiverValid(error.response.data.status);
            setErrorMsg({ user: error.response.data.msg });
          }
        });
    }
  };

  const handleTransfer = (event) => {
    event.preventDefault();

    if (formData.transactionAmount_dollars > 0) {
      axios
        .post("/transfer/new", formData)
        .then((response) => {
          console.log(response);
          if (response.data === "success") {
            console.log("success");
            setNextPage({ transaction: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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

  return (
    <Container>
      <Row className="justify-content-center mb-5">
        <h1>Send Payment</h1>
      </Row>

      <Row className="justify-content-center mb-3">
        Creditor's Username:
        <input
          type="number"
          name="creditorUsername"
          value={formData.creditorUsername}
          placeholder="Phone Number"
          onChange={handleChangeForUsernameField}
        ></input>
      </Row>
      <Row className="justify-content-center mb-5">
        <Button
          variant="success"
          onClick={(e) => {
            handleCheck(e);
          }}
        >
          Check Username
        </Button>
      </Row>

      {isReceiverValid ? (
        <>
          <Row className="justify-content-center mb-3">
            Transfer amount:
            <input
              type="number"
              name="transactionAmount_dollars"
              placeholder="Input format: *.xx"
              value={formData.transactionAmount_dollars}
              onChange={handleChange}
            ></input>
          </Row>
          <Row className="justify-content-center mb-3">
            Description:
            <textarea
              name="description"
              value={formData.description}
              placeholder="Optional"
              onChange={handleChange}
            ></textarea>
          </Row>
          <Row className="justify-content-center mb-5">
            <Button
              variant="success"
              onClick={(e) => {
                handleTransfer(e);
              }}
            >
              Send
            </Button>
          </Row>
        </>
      ) : (
        <Row className="justify-content-center mb-5">
          <p>{errorMsg.user}</p>
        </Row>
      )}

      <Row className="justify-content-center mb-5 mt-5">
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

export default Transfer;
