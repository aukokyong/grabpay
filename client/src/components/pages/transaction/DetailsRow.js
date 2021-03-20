const DetailsRow = (props) => {
  // console.log(props);

  const Debit = () => {
    return (
      <>
        <td></td>
        <td>{(props.transaction.transactionAmount_cents / 100).toFixed(2)}</td>
      </>
    );
  };

  const Credit = () => {
    return (
      <>
        <td>{(props.transaction.transactionAmount_cents / 100).toFixed(2)}</td>
        <td></td>
      </>
    );
  };

  return (
    <>
      <tr>
        <td>{props.transaction.createdAt}</td>
        <td>{props.transaction.description}</td>
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
