import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
} from "@connect2ic/react";

function LandingPage() {
  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: (principal, activeProvider) => {
      console.log("Connected to ", activeProvider, "with principal", principal);
    },
  });
  const [wallet, setWallet] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [address, setAddress] = useState("");
  const [callBackUrl, setCallBackUrl] = useState("");
  const [error, setError] = useState(""); // State for error message

  // add logic for connecting wallet
  function connectWallet() {
    // add logic for connecting wallet
  }

  // add logic for generating API key
  function generateAPIKey(e) {
    e.preventDefault();
    // add logic for generating API key
    if (!address || !callBackUrl) {
      setError("Please fill in all required details.");
      return; // Don't proceed if fields are empty
    }
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
            <button className="profile-button">My Profile</button>
          ) : (
            <form on onSubmit={generateAPIKey} className="api-key-form">
              <label>Enter wallet address</label>
              <input
                type="text"
                placeholder="Enter wallet address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
          <ConnectButton onConnect={() => console.log("Connected")} />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
