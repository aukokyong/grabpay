import { useState } from "react";
import LoginForm from "./home/LoginForm";
import SignupForm from "./home/SignupForm";
import { Container, Row, Button } from "react-bootstrap";

const Home = (props) => {
  const [form, setForm] = useState("login");

  const handleClick = (event) => {
    setForm(event.target.name);
  };

  return (
    <Container>
      <Row className="justify-content-center mb-5">
        <h1>Welcome to GrabPay</h1>
      </Row>

      {form === "login" ? (
        <>
          <Row className="justify-content-center mb-5">
            <Button
              variant="success"
              onClick={(e) => {
                handleClick(e);
              }}
              name="signup"
            >
              Click to Sign Up
            </Button>
          </Row>
          <Row className="justify-content-center">
            <LoginForm
              setIsloggedin={props.setIsloggedin}
              setUserInfo={props.setUserInfo}
            />
          </Row>
        </>
      ) : (
        <>
          <Row className="justify-content-center mb-5">
            <Button
              variant="success"
              onClick={(e) => {
                handleClick(e);
              }}
              name="login"
            >
              Click to Login
            </Button>
          </Row>
          <Row className="justify-content-center">
            <SignupForm
              setIsloggedin={props.setIsloggedin}
              setUserInfo={props.setUserInfo}
            />
          </Row>
        </>
      )}
    </Container>
  );
};

export default Home;
