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
  const [budgetOverview, setBudgetOverview] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const fetchDashboard = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(`http://127.0.0.1:5000/dashboard?user_id=${userId}`);
      setDashboard(response.data);
      setBudgetOverview(response.data.budget_overview || []);
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

          {budgetOverview.length === 0 ? (
            <div className="alert alert-secondary">
              No budgets found yet. Add budgets in the Budget page to track progress.
            </div>
          ) : (
            budgetOverview.map((item) => {
              const barClass = item.percent >= 100 ? "bg-danger" : item.percent >= 75 ? "bg-warning" : "bg-success";

              return (
                <div key={item.category} className="mb-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>{item.category}</strong>
                    </div>
                    <div>
                      ₹{item.spent.toFixed(2)} / ₹{item.budget_amount.toFixed(2)}
                    </div>
                  </div>

                  <div className="progress mb-2">
                    <div
                      className={`progress-bar ${barClass}`}
                      role="progressbar"
                      style={{ width: `${item.percent}%` }}
                      aria-valuenow={item.percent}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {item.percent}%
                    </div>
                  </div>

                  <div className="small text-muted">
                    {item.remaining > 0
                      ? `Remaining ₹${item.remaining.toFixed(2)} of budget`
                      : "Budget exceeded"}
                  </div>
                </div>
              );
            })
          )}
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
