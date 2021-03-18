import axios from "axios";
import { useState, useEffect } from "react";

const Balance = (props) => {
  console.log(props);

  const [accountBalance, setAccountBalance] = useState(0);

  // useEffect(() => {
  //   axios
  //     .get("/balance/")
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <>
      <h1>Balance Page</h1>
      <h1>Account Balance:</h1>
      <h1>SGD ${accountBalance}</h1>
    </>
  );
};

export default Balance;
