import { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import axios from "axios";

const SignupForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log("clicked");

    axios
      .post("/user/new")
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row className="justify-content-sm-center mb-3">
        <h1>Sign Up</h1>
      </Row>
      <form>
        <Row className="justify-content-sm-center mb-3">
          Username:
          <input
            type="number"
            name="username"
            value={formData.username}
            onChange={handleChange}
          ></input>
        </Row>
        <Row className="justify-content-sm-center mb-3">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          ></input>
        </Row>
        <Row className="justify-content-sm-center mb-3">
          <Button type="submit" onClick={(e) => handleClick(e)}>
            Sign Up
          </Button>
        </Row>
      </form>
    </Container>
  );
};

export default SignupForm;
