import { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

const LoginForm = (props) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
    setErrorMsg({ username: "", password: "" });
  };

  const handleClick = (event) => {
    event.preventDefault();

    axios
      .post("/session", formData)
      .then((response) => {
        // console.log(response);
        props.setIsloggedin(true);
        props.setUserInfo(response.data);
      })
      .catch((error) => {
        // console.log(error.response.data);
        setErrorMsg((state) => {
          return { ...state, ...error.response.data };
        });
      });
  };

  return (
    <Container>
      <Row className="justify-content-center mb-3">
        <h1>Login</h1>
      </Row>
      <form>
        <Row className="justify-content-center mb-3">
          Username:
          <input
            name="username"
            value={formData.username}
            placeholder="Phone Number"
            onChange={handleChange}
          ></input>
        </Row>
        <Row className="justify-content-center mb-3">
          <p>{errorMsg.username}</p>
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
          <p>{errorMsg.password}</p>
        </Row>
        <Row className="justify-content-center mb-3">
          <Button
            type="submit"
            variant="success"
            onClick={(e) => handleClick(e)}
          >
            Login
          </Button>
        </Row>
      </form>
    </Container>
  );
};

export default LoginForm;
