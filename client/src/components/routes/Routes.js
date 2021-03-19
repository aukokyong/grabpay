import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Balance from "../pages/Balance";
import Transaction from "../pages/Transaction";
import Transfer from "../pages/Transfer";
import Welcome from "../pages/Welcome";

const Routes = (props) => {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Welcome userInfo={props.userInfo} />
        </Route>
        <Route path="/balance" exact>
          <Balance userInfo={props.userInfo} />
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
