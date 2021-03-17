import { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState();

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log("clicked");

    axios
      .post("/session")
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row className="justify-content-sm-center mb-3">
        <h1>Login</h1>
      </Row>
      <form>
        <Row className="justify-content-sm-center mb-3">
          Username:
          <input name="username" onChange={handleChange}></input>
        </Row>
        <Row className="justify-content-sm-center mb-3">
          Password:
          <input name="password" onChange={handleChange}></input>
        </Row>
        <Row className="justify-content-sm-center mb-3">
          <Button type="submit" onClick={(e) => handleClick(e)}>
            Login
          </Button>
        </Row>
      </form>
    </Container>
  );
};

export default LoginForm;
