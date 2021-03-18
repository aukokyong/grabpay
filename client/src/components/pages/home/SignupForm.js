import { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import axios from "axios";
import { response } from "express";

const SignupForm = (props) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState({ msg: "" });

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
    setErrorMsg({ msg: "" });
  };

  const handleClick = (event) => {
    event.preventDefault();

    axios
      .post("/user/new", formData)
      .then((response) => {
        setErrorMsg({ msg: response.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center mb-3">
        <h1>Sign Up</h1>
      </Row>
      <form>
        <Row className="justify-content-center mb-1">
          Username:
          <input
            name="username"
            value={formData.username}
            placeholder="Phone Number"
            onChange={handleChange}
          ></input>
        </Row>
        <Row className="justify-content-center">
          <p>{errorMsg.msg}</p>
        </Row>
        <Row className="justify-content-center mb-3">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          ></input>
        </Row>
        <Row className="justify-content-center mb-3">
          <Button
            type="submit"
            variant="success"
            onClick={(e) => handleClick(e)}
          >
            Sign Up
          </Button>
        </Row>
      </form>
    </Container>
  );
};

export default SignupForm;
