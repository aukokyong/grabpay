import { Navbar, Nav, Button } from "react-bootstrap";
// import { useState } from "react";
import axios from "axios";
// import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

const Navibar = (props) => {
  // const [isLogout, setIslogout] = useState(false);

  const handleLogout = (event) => {
    event.preventDefault();
    console.log("clicked");

    axios
      .delete("/session")
      .then((response) => {
        console.log(response);
        // setIslogout(true);
        props.setIsloggedin(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if (isLogout) {
  //   <Redirect to="/" />;
  // }

  return (
    <>
      <Navbar bg="success" variant="dark">
        <Navbar.Brand as={Link} to="/summary">
          GrabPay
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/summary">
            Summary
          </Nav.Link>
          <Nav.Link as={Link} to="/transaction">
            Transaction History
          </Nav.Link>
          <Nav.Link as={Link} to="/transfer">
            Transfer
          </Nav.Link>
        </Nav>
        <Button
          variant="danger"
          onClick={(e) => {
            handleLogout(e);
          }}
        >
          Logout
        </Button>
      </Navbar>
    </>
  );
};

export default Navibar;
