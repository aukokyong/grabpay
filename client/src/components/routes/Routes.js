import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Summary from "../pages/Summary";
import Transaction from "../pages/Transaction";
import Transfer from "../pages/Transfer";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path="/summary">
          <Summary />
        </Route>
        <Route path="/transaction">
          <Transaction />
        </Route>
        <Route path="/transfer">
          <Transfer />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
