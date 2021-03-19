import { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import axios from "axios";

const SignupForm = (props) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState({ msg: "" });
  const [isAccCreated, setIsAccCreated] = useState("");

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
        console.log(response.data);
        if (response.data == "success") {
          setFormData({ username: "", password: "" });
          setIsAccCreated("Account created successfully. Please login now.");
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status == 401) {
          setErrorMsg({ msg: error.response.data });
        }
      });
  };

  return (
    <Container>
      <Row className="justify-content-center mb-3">
        <h1>Sign Up</h1>
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
          <p>{errorMsg.msg}</p>
        </Row>
        <Row className="justify-content-center mb-5">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          ></input>
        </Row>
        <Row className="justify-content-center mb-5">
          <Button
            type="submit"
            variant="success"
            onClick={(e) => handleClick(e)}
          >
            Sign Up
          </Button>
        </Row>
        <Row className="justify-content-center mb-3">
          <p>{isAccCreated}</p>
        </Row>
      </form>
    </Container>
  );
};

export default SignupForm;
