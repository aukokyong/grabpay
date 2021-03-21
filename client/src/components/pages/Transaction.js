import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Col, Row, Button } from "react-bootstrap";
import DetailsRow from "./transaction/DetailsRow";
import { Redirect } from "react-router-dom";
import dayjs from "dayjs";

const Transaction = (props) => {
  // console.log(props);

  const today = dayjs().format("YYYY-MM-DD");
  const yearago = dayjs().subtract(1, "year").format("YYYY-MM-DD");

  const [transactionDetails, setTransactionDetails] = useState([]);
  const [nextPage, setNextPage] = useState({
    balance: false,
    transfer: false,
  });
  const [filterDate, setFilterDate] = useState({ start: yearago, end: today });
  // console.log(filterDate);

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
  }, [props.userInfo._id]);

  const handleSelectDate = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    setFilterDate((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  const handleClickNextPage = (event) => {
    console.log(event.target.name);
    setNextPage((state) => {
      return { ...state, [event.target.name]: true };
    });
  };
  if (nextPage.balance) {
    return <Redirect to="/balance" />;
  }
  if (nextPage.transfer) {
    return <Redirect to="/transfer" />;
  }

  const filterFunction = (item) => {
    const checkDate = dayjs(item.createdAt);
    const endDayPlusOne = dayjs(filterDate.end).add(1, "day");
    const diffStart = checkDate.diff(filterDate.start, "month", true);
    const diffEnd = checkDate.diff(endDayPlusOne, "month", true);
    // console.log(diffStart);
    // console.log(diffEnd);

    if (diffStart >= 0 && diffEnd <= 0) {
      return item;
    }
  };

  const CalulateTotal = () => {
    let credit = 0;
    let debit = 0;

    transactionDetails
      .filter((item) => {
        return filterFunction(item);
      })
      .forEach((transaction) => {
        // console.log(credit);
        // console.log(debit);
        if (transaction.creditorID === props.userInfo._id) {
          credit += transaction.transactionAmount_cents;
        } else {
          debit += transaction.transactionAmount_cents;
        }
      });
    return (
      <>
        <tr>
          <td colSpan={4} className="text-right">
            Total:
          </td>
          <td className="text-center">{(credit / 100).toFixed(2)}</td>
          <td className="text-center">{(debit / 100).toFixed(2)}</td>
        </tr>
      </>
    );
  };

  return (
    <Container>
      <h1 className="text-center mb-5">Transaction History</h1>
      <Row className="justify-content-center">
        <Col xs="auto">
          Start Date:
          <input
            type="date"
            name="start"
            className="mb-5"
            defaultValue={yearago}
            // min={yearago}
            // max={today}
            onChange={(e) => {
              handleSelectDate(e);
            }}
          ></input>
        </Col>
        <Col xs="auto">
          End Date:
          <input
            type="date"
            name="end"
            className="mb-5"
            defaultValue={today}
            // min={yearago}
            // max={today}
            onChange={(e) => {
              handleSelectDate(e);
            }}
          ></input>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">S/N</th>
            <th className="text-center">Date</th>
            <th className="text-center">Transaction</th>
            <th className="text-center">Description</th>
            <th className="text-center">Credit</th>
            <th className="text-center">Debit</th>
          </tr>
        </thead>
        <tbody>
          {transactionDetails
            .filter((item) => {
              return filterFunction(item);
            })
            .map((transaction, index) => {
              return (
                <DetailsRow
                  key={transaction._id}
                  index={index}
                  transaction={transaction}
                  currentUser={props.userInfo._id}
                />
              );
            })}

          <CalulateTotal />
        </tbody>
      </Table>

      <Row className="justify-content-center mb-5 mt-5">
        <Col xs="auto">
          <Button
            name="balance"
            className="mb-3 mt-3"
            onClick={(e) => {
              handleClickNextPage(e);
            }}
          >
            View Account Balance
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            name="transfer"
            className="mb-3 mt-3"
            onClick={(e) => {
              handleClickNextPage(e);
            }}
          >
            Send Payment
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Transaction;
