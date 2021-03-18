import Home from "./components/pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navibar from "./components/layout/Navibar";
import Routes from "./components/routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [isLoggedin, setIsloggedin] = useState(false);

  useEffect(() => {
    axios
      .get("/session/check", { withCredentials: true })
      .then((response) => {
        console.log("checking login", response.data);
        setIsloggedin(response.data);
      })
      .catch((error) => {
        setIsloggedin(false);
        console.log(error.response);
      });
  }, [isLoggedin]);

  return (
    <>
      <Router>
        {isLoggedin ? (
          <>
            <Navibar setIsloggedin={setIsloggedin} />
            <Routes />
          </>
        ) : (
          <Home setIsloggedin={setIsloggedin} />
        )}
      </Router>
    </>
  );
}

export default App;
