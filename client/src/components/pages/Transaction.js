import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import DetailsRow from "./transaction/DetailsRow";

const Transaction = (props) => {
  // console.log(props);

  const [transactionDetails, setTransactionDetails] = useState([]);
  // console.log(transaction);

  useEffect(() => {
    axios
      .get("/transaction/" + props.userInfo._id)
      .then((response) => {
        console.log(response);
        setTransactionDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <h1>Transaction Page</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
          </tr>
        </thead>
        <tbody>
          {transactionDetails.map((transaction) => {
            return (
              <DetailsRow
                key={transaction._id}
                transaction={transaction}
                currentUser={props.userInfo._id}
              />
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Transaction;
