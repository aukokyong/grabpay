const DetailsRow = (props) => {
  console.log(props);

  const Debit = () => {
    return (
      <>
        <td></td>
        <td>{props.transaction.transactionAmount_cents / 100}</td>
      </>
    );
  };

  const Credit = () => {
    return (
      <>
        <td>{props.transaction.transactionAmount_cents / 100}</td>
        <td></td>
      </>
    );
  };

  return (
    <>
      <tr>
        <td>{props.transaction.createdAt}</td>
        <td>{props.transaction.description}</td>
        {props.transaction.creditor === props.currentUser ? (
          <Credit />
        ) : (
          <Debit />
        )}
      </tr>
    </>
  );
};

export default DetailsRow;
