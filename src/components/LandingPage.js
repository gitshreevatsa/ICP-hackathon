import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Dashboard from "./Dashboard";

const { AuthClient } = require("@dfinity/auth-client");
function LandingPage() {
  // const { isConnected, principal, activeProvider } = useConnect({
  //   onConnect: (principal, activeProvider) => {
  //     console.log("Connected to ", activeProvider, "with principal", principal);
  //   },
  // });
  const [wallet, setWallet] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [address, setAddress] = useState("");
  const [callBackUrl, setCallBackUrl] = useState("");
  const [subscriptionFee, setSubscriptionFee] = useState(0);
  const [details, setDetails] = useState("");
  const [error, setError] = useState(""); // State for error message

  // add logic for connecting wallet
  async function connectWallet() {
    // const authClient = await AuthClient.create();
    // await authClient.login();
    // const identity = await authClient.getIdentity();
    // const principal = identity.getPrincipal().toString();
    // console.log("Connected to ", principal);
    // console.log("Identity: ", identity);
    // console.log(identity.getKeyPair())
    // setWallet(principal);

    const publicKey = await window.ic.plug.requestConnect();
    console.log("Connected to ", publicKey);

    console.log(await window.ic.plug.isConnected());
    console.log(window.ic.plug.sessionManager.sessionData);
    console.log(window.ic.plug.sessionManager.sessionData.principalId);
    setWallet(window.ic.plug.sessionManager.sessionData.principalId);
  }

  // add logic for generating API key
  function generateAPIKey(e) {
    e.preventDefault();
    // add logic for generating API key
    if (!address || !callBackUrl || !subscriptionFee || !details) {
      setError("Please fill in all required details.");
      return; // Don't proceed if fields are empty
    }else{
      const randomGenerator = Math.random().toString(36).slice(2);
      const apiKey = hmacSHA512(randomGenerator, address).toString();
      console.log(apiKey);
      setApiKey(apiKey);
    }
  }

  function moveToProfile() {
    
    // add logic for moving to profile page
  }
  useEffect(() => {
    // call the backend api with wallet address and user profile

  }, [wallet]);

  return (
    <div className="landing-page-container">
      <h1>Payment Gateway Service on ICP</h1>
      <p>
        Generate an API key after connecting your wallet and filling in the
        details.
      </p>

      {wallet ? (
        <div>
          <h1>Wallet Connected</h1>
          <p>Wallet Address: {wallet}</p>

          {apiKey ? (
            <button className="profile-button" onClick={moveToProfile}>My Profile</button>
          ) : (
            <form onSubmit={generateAPIKey} className="api-key-form">
              <label>Enter wallet address</label>
              <input
                type="text"
                placeholder="Enter wallet address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <label>Enter Details for your customer</label>
              <input
                type="text"
                placeholder="Enter Details for your customer"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
              <label>Enter Subscription Fee</label>
              <input
                type="text"
                placeholder="Enter Subscription Fee"
                value={subscriptionFee}
                onChange={(e) => setSubscriptionFee(e.target.value)}
                required
              />
              <label>Enter callback url</label>
              <input
                type="text"
                placeholder="Enter callback url"
                value={callBackUrl}
                onChange={(e) => setCallBackUrl(e.target.value)}
                required
              />
              <div className="button-container">
                <button className="generate-api-key-button">
                  Generate API Key
                </button>
              </div>{" "}
            </form>
          )}
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <div>
          <h1>Connect Wallet</h1>
          <p>Connect your wallet to continue</p>
          <button className="connect-wallet-button" onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
