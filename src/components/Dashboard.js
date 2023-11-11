// Dashboard.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Import CSS for styling
import Loader from './Loader';
import { useUser } from './UserContext';

function Dashboard() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const { user, updateUser } = useUser();

  // Simulated data fetching (replace with actual data retrieval)
  useEffect(() => {
    // call api with api key to get details
  })

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {console.log(user)}
      <div className="dashboard-stats">
        <div className="stat">
          <div className="stat-api">${user?.apiKey}</div>
          <div className="stat-label">API key</div>
        </div>
      </div>
      <div className='dashboard-stats'>
        <div className="stat">
          <div className="stat-value">${user?.totalAmount?.toFixed(2)}</div>
          <div className="stat-label">Total Amount Collected</div>
        </div>
        <div className="stat">
          <div className="stat-value">{user?.totalTransactions}</div>
          <div className="stat-label">Total Number of Transactions</div>
        </div>
        <div className="stat">
          <div className="stat-value">{user?.totalUsers}</div>
          <div className="stat-label">Total Number of Users</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
