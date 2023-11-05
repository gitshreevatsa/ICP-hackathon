// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

// import { defaultProviders } from "@connect2ic/core/providers";
import { createClient } from "@connect2ic/core";
import { Connect2ICProvider } from "@connect2ic/react";
import { AstroX } from "@connect2ic/core/providers/astrox"
import { PlugWallet } from "@connect2ic/core/providers/plug-wallet"

import LandingPage from "./components/LandingPage";

const client = createClient({
  providers: [
    new AstroX(),
    new PlugWallet()
  ],
});
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Connect2ICProvider client={client}>
              <LandingPage />
            </Connect2ICProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
