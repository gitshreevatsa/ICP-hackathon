import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Payment() {
  const [wallet, setWallet] = useState(null);
  const [address, setAddress] = useState("");
  const [callBackUrl, setCallBackUrl] = useState("");
  const [subscriptionFee, setSubscriptionFee] = useState();
  const [details, setDetails] = useState("");

  const { walletAddress } = useParams();
  const { apiKey } = useParams();

  useEffect(() => {
    // call the backedn with the api key and fetch  : callback url, subscription fee, details
  });

  async function connectWallet() {
    const publicKey = await window.ic.plug.requestConnect({ whitelist: [] });
    console.log("Connected to ", publicKey);

    console.log(await window.ic.plug.isConnected());
    console.log(window.ic.plug.sessionManager.sessionData);
    console.log(window.ic.plug.sessionManager.sessionData.principalId);
    if (
      walletAddress === window.ic.plug.sessionManager.sessionData.principalId
    ) {
      setAddress(walletAddress);
    } else {
      alert("Wallet address is not correct");
    }
  }

  async function pay() {
    // add logic for paying the subscription fee
    // call the canister
    // call the backend api : To store the payment details such as wallet address paid, amount and increment total amount for the API key, total wallets paid, total transactions
    // call the call backurl with the payment details
  }

  return (
    <div>
      <h1>Subscription Fee : {subscriptionFee}</h1>
      <h1>Details : {details}</h1>
      <h1>Owner : {address}</h1>
      {wallet ? (
        <button onClick={pay}>Pay</button>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
