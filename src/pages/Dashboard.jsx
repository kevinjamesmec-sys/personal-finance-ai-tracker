import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    total_income: 0,
    total_expenses: 0,
    savings: 0,
  });
  const [transactions, setTransactions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const fetchDashboard = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(`http://127.0.0.1:5000/dashboard?user_id=${userId}`);
      setDashboard(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTransactions = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(`http://127.0.0.1:5000/expenses?user_id=${userId}`);
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchDashboard();
      fetchTransactions();
    }
  }, [userId]);

  if (!userId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      className="container mt-4"
      style={{
        background: "rgba(255,255,255,0.3)",
        minHeight: "100vh"
      }}
    >
      <h1 className="mb-4">Personal Finance Dashboard</h1>

      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3 shadow">
            <div className="card-body">
              <h5>Total Income</h5>
              <h3>₹{dashboard.total_income}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-danger mb-3 shadow">
            <div className="card-body">
              <h5>Total Expenses</h5>
              <h3>₹{dashboard.total_expenses}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3 shadow">
            <div className="card-body">
              <h5>Savings</h5>
              <h3>₹{dashboard.savings}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card mt-4 shadow">
        <div className="card-body">
          <h4>Recent Transactions</h4>

          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.expense_name}</td>
                  <td>{transaction.category}</td>
                  <td>₹{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="card mt-4 shadow">
        <div className="card-body">
          <h4>Budget Overview</h4>

          <p>Food Budget: ₹5000 / ₹7000</p>

          <div className="progress mb-3">
            <div
              className="progress-bar bg-danger"
              style={{ width: "70%" }}
            >
              70%
            </div>
          </div>

          <p>Shopping Budget: ₹2000 / ₹3000</p>

          <div className="progress">
            <div
              className="progress-bar bg-warning"
              style={{ width: "60%" }}
            >
              60%
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="card mt-4 shadow">
        <div className="card-body">
          <h4>AI Insights</h4>

          <div className="alert alert-info">
            You spent 35% of your monthly income on food.
          </div>

          <div className="alert alert-warning">
            Entertainment spending exceeded your budget by 20%.
          </div>

          <div className="alert alert-success">
            You saved ₹15,000 this month.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
