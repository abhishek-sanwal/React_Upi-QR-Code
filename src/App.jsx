import "./App.css";

import { useReducer, useState } from "react";

import QRCode from "react-qr-code";

const initialState = {
  payeeAddress: "",
  payeeName: "",
  amount: 0,
  currencyCode: "INR",
  transactionNote: "",
  qrCode: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "setPayeeAddress":
      return { ...state, payeeAddress: action.payload };
    case "setPayeeName":
      return { ...state, payeeName: action.payload };
    case "setAmount":
      return { ...state, amount: action.payload };
    case "setCurrencyCode":
      return { ...state, currencyCode: action.payload };
    case "setTransactionNote":
      return { ...state, transactionNote: action.payload };
    default: {
      throw new Error("Invalid Action type");
    }
  }
}

function App() {
  const [qrCode, setQrCode] = useState("");
  const [
    { payeeAddress, payeeName, amount, currencyCode, transactionNote },
    dispatch,
  ] = useReducer(reducer, initialState);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("clicked", typeof setQrCode);
    console.table({
      payeeAddress,
      payeeName,
      amount,
      currencyCode,
      transactionNote,
    });
    if (payeeAddress && payeeName && amount > 0 && currencyCode) {
      setQrCode(
        `upi://pay?pa=${payeeAddress}&pn=${payeeName}&am=${amount}&cu=${currencyCode}${
          transactionNote ? `&tn=${transactionNote}` : ""
        }`
      );
    }
  }
  return (
    <section className="app">
      <h1 className="heading">Enter Details to Create UPI Qr code</h1>
      <form className="user-input" onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          value={payeeAddress}
          placeholder="Enter Your Upi Address"
          required
          onChange={(event) =>
            dispatch({ type: "setPayeeAddress", payload: event.target.value })
          }
        />
        <input
          type="text"
          value={payeeName}
          onChange={(event) =>
            dispatch({ type: "setPayeeName", payload: event.target.value })
          }
          placeholder="Enter Your Name"
          required
        />
        <input
          type="number"
          value={amount}
          placeholder="Enter amount you want to receive"
          onChange={(event) =>
            dispatch({ type: "setAmount", payload: Number(event.target.value) })
          }
          required
        />
        <input
          type="text"
          value={currencyCode}
          onChange={(event) =>
            dispatch({ type: "setCurrencyCode", payload: event.target.value })
          }
          placeholder="Enter any currency code"
        />
        <input
          type="text"
          value={transactionNote}
          onChange={(event) =>
            dispatch({
              type: "setTransactionNote",
              payload: event.target.value,
            })
          }
          placeholder="Enter transaction Note(Optional)"
        />
        <button>Click here to generate qr code</button>
      </form>
      <main className="qr">{qrCode && <QRCode value={qrCode} />}</main>
    </section>
  );
}

export default App;
