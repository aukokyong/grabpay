import { Navbar, Nav, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

const Navibar = (props) => {
  const [isLogoutBtnClicked, setIsLogoutBtnClicked] = useState(false);

  const handleLogout = (event) => {
    event.preventDefault();
    setIsLogoutBtnClicked(true);
    axios
      .delete("/session")
      .then((response) => {
        console.log(response);
        props.setIsloggedin(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLogoutBtnClicked) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Navbar bg="success" variant="dark">
        <Navbar.Brand as={Link} to="/">
          GrabPay
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Balance
          </Nav.Link>
          <Nav.Link as={Link} to="/transaction">
            Transaction
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
