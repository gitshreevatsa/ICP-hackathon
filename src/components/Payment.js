import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { idlFactory } from "./ledger.did";
import { Principal } from "@dfinity/principal";

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
    const icpCanisterId = "ryjl3-tyaaa-aaaaa-aaaba-cai";
    const whitelist = [icpCanisterId];
    const publicKey = await window.ic.plug.requestConnect({ whitelist });
    console.log("Connected to ", publicKey);

    const icpActor = await window.ic.plug.createActor({
      canisterId: icpCanisterId,
      interfaceFactory: idlFactory,
    });

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
    const transferArgs = {
      to: "WALLET ADDRESS OF THE OWNER",
      amount: subscriptionFee * (10 ^ 8),
      memo: new Uint16Array(8),
    };
    // add logic for paying the subscription fee by calling canister
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
