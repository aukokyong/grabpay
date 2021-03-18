import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Summary from "../pages/Summary";
import Transaction from "../pages/Transaction";
import Transfer from "../pages/Transfer";

const Routes = (props) => {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Summary userInfo={props.userInfo} />
        </Route>
        <Route path="/transaction" exact>
          <Transaction userInfo={props.userInfo} />
        </Route>
        <Route path="/transfer" exact>
          <Transfer userInfo={props.userInfo} />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
