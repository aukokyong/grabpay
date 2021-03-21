import dayjs from "dayjs";

const DetailsRow = (props) => {
  // console.log(props);

  const date = dayjs(props.transaction.createdAt).format("DD/MM/YYYY");

  const Debit = () => {
    return (
      <>
        <td className="text-center">{props.index}</td>
        <td className="text-center">{date}</td>
        <td className="text-center">{props.transaction.creditorUsername}</td>
        <td className="text-center">{props.transaction.description}</td>
        <td className="text-center"></td>
        <td className="text-center">
          {(props.transaction.transactionAmount_cents / 100).toFixed(2)}
        </td>
      </>
    );
  };

  const Credit = () => {
    return (
      <>
        <td className="text-center">{props.index}</td>
        <td className="text-center">{date}</td>
        <td className="text-center">{props.transaction.debtorUsername}</td>
        <td className="text-center">{props.transaction.description}</td>
        <td className="text-center">
          {(props.transaction.transactionAmount_cents / 100).toFixed(2)}
        </td>
        <td className="text-center"></td>
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
