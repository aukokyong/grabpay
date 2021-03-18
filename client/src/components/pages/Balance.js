import axios from "axios";
import { useState, useEffect } from "react";

const Balance = (props) => {
  console.log(props);

  useEffect(() => {
    axios
      .get()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>Balance Page</h1>
    </>
  );
};

export default Balance;
