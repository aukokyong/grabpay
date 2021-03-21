import Home from "./components/pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navibar from "./components/layout/Navibar";
import Routes from "./components/routes/Routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [isLoggedin, setIsloggedin] = useState(false);
  const [userInfo, setUserInfo] = useState("No info");
  // console.log(userInfo);

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
            <Routes userInfo={userInfo} />
          </>
        ) : (
          <>
            <Switch>
              <Route path="/" exact>
                <Home setIsloggedin={setIsloggedin} setUserInfo={setUserInfo} />
              </Route>
            </Switch>
          </>
        )}
      </Router>
    </>
  );
}

export default App;
