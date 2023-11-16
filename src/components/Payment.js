import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Payment() {
  const [wallet, setWallet] = useState();
  const [address, setAddress] = useState("");
  const [callBackUrl, setCallBackUrl] = useState("");
  const [subscriptionFee, setSubscriptionFee] = useState();
  const [details, setDetails] = useState("");
  const [user, setUser] = useState("");
  const { walletAddress } = useParams();
  const { apiKey } = useParams();

  const getKey = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/login?apiKey=${apiKey}`
      );
      setUser(res?.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getKey();
  }, [apiKey]);

  async function connectWallet() {
    const icpCanisterId = "ryjl3-tyaaa-aaaaa-aaaba-cai";
    const whitelist = [icpCanisterId];
    const publicKey = await window.ic.plug.requestConnect({ whitelist });
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
    const transferArgs = {
      to: user?.walletAddress,
      amount: user?.amount * (10 ^ 8),
      memo: new Uint16Array(8),
    };

    await window.ic.plug.requestTransfer(transferArgs);
    const res = axios.get(
      `${user?.callBackUrl}?apiKey=${apiKey}&walletAddress=${walletAddress}&subscription=true`
    ); // call the call backurl with the payment details
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h2>Payment</h2>
        <div className="dashboard-stats">
          <div className="stat">
            <div className="stat-value">{user?.amount}</div>
            <div className="stat-label">Subscription Fee</div>
          </div>
          <div className="stat">
            <div className="stat-value">{user?.details}</div>
            <div className="stat-label">Details</div>
          </div>
          <div className="stat">
            <div className="stat-value">{user?.walletAddress}</div>
            <div className="stat-label">Owner</div>
          </div>
        </div>
        <div>
          <div className="stat">
            {wallet == user?.walletAddress ? (
              <button onClick={pay}>Pay</button>
            ) : (
              <button onClick={connectWallet}>Connect Wallet</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
