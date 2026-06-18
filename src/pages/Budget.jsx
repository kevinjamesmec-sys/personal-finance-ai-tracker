import { useState, useEffect } from "react";
import axios from "axios";

function Budget() {
  const [category, setCategory] = useState("Food");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgets, setBudgets] = useState([]);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/budget");
      setBudgets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:5000/budget", {
        user_id: 1,
        category: category,
        budget_amount: budgetAmount,
      });

      alert("Budget saved successfully");
      setCategory("Food");
      setBudgetAmount("");
      fetchBudgets();
    } catch (error) {
      console.error(error);
      alert("Saving budget failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="card shadow">
            <div className="card-body">

              <h2 className="mb-4">
                Budget Management
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Category
                  </label>

                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Shopping</option>
                    <option>Entertainment</option>
                    <option>Utilities</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Monthly Budget Amount
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Budget Amount"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-warning"
                >
                  Save Budget
                </button>

              </form>

              <div className="table-responsive mt-4">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Category</th>
                      <th>Budget Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgets.map((budget) => (
                      <tr key={budget.id}>
                        <td>{budget.id}</td>
                        <td>{budget.category}</td>
                        <td>{budget.budget_amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Budget;
