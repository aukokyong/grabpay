import { useState } from "react";
import LoginForm from "./Home/LoginForm";
import SignupForm from "./Home/SignupForm";
import { Container, Row, Button, Col } from "react-bootstrap";

const Home = () => {
  const [form, setForm] = useState("login");

  const handleClick = (event) => {
    console.log(event.target.name);
    setForm(event.target.name);
  };

  return (
    <Container>
      <Row className="justify-content-sm-center mb-5">
        <h1>Welcome to GrabPay</h1>
      </Row>

      {form === "login" ? (
        <>
          <Row className="justify-content-sm-center mb-5">
            <Button
              onClick={(e) => {
                handleClick(e);
              }}
              name="signup"
            >
              Click to Sign Up
            </Button>
          </Row>
          <Row className="justify-content-sm-center">
            <LoginForm />
          </Row>
        </>
      ) : (
        <>
          <Row className="justify-content-sm-center mb-5">
            <Button
              onClick={(e) => {
                handleClick(e);
              }}
              name="login"
            >
              Click to Login
            </Button>
          </Row>
          <Row className="justify-content-sm-center">
            <SignupForm />
          </Row>
        </>
      )}
    </Container>
  );
};

export default Home;
