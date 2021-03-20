const DetailsRow = (props) => {
  // console.log(props);

  const Debit = () => {
    return (
      <>
        <td>{props.transaction.createdAt}</td>
        <td>{props.transaction.creditorUsername}</td>
        <td>{props.transaction.description}</td>
        <td></td>
        <td>{(props.transaction.transactionAmount_cents / 100).toFixed(2)}</td>
      </>
    );
  };

  const Credit = () => {
    return (
      <>
        <td>{props.transaction.createdAt}</td>
        <td>{props.transaction.debtorUsername}</td>
        <td>{props.transaction.description}</td>
        <td>{(props.transaction.transactionAmount_cents / 100).toFixed(2)}</td>
        <td></td>
      </>
    );
  };

  return (
    <>
      <tr>
        {props.transaction.creditorID === props.currentUser ? (
          <Credit />
        ) : (
          <Debit />
        )}
      </tr>
    </>
  );
};

export default DetailsRow;
