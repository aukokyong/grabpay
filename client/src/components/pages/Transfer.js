import { useState } from "react";
import axios from "axios";
import { Container, Button, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const Transfer = (props) => {
  console.log(props);

  const [formData, setFormData] = useState({
    username: "",
    debtorID: props.userInfo._id,
    debtorUsername: props.userInfo.username,
    transactionAmount_dollars: 0,
    description: "",
  });
  const [isReceiverValid, setIsReceiverValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ user: "" });
  const [isSuccess, setIsSuccess] = useState(false);

  console.log(formData);

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

    axios
      .post("/transfer/check", { username: formData.username })
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
            setIsSuccess(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  if (isSuccess) {
    return <Redirect to="/transaction" />;
  }

  return (
    <Container>
      <Row className="justify-content-center mb-5">
        <h1>Transfer Page</h1>
      </Row>

      <Row className="justify-content-center mb-3">
        Creditor's Username:
        <input
          type="number"
          name="username"
          value={formData.username}
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
          <Row className="justify-content-center mb-3">
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
        <Row className="justify-content-center mb-3">
          <p>{errorMsg.user}</p>
        </Row>
      )}
    </Container>
  );
};

export default Transfer;
