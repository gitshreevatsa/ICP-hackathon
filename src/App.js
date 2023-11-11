// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { UserProvider } from './components/UserContext';

import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";

// const client = createClient({
//   providers: [
//     new PlugWallet()
//   ],
// });
function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            // <Connect2ICProvider client={client}>
              <LandingPage />
            // </Connect2ICProvider>
          }
        />
        <Route path="/profile" element={<Dashboard/>} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
