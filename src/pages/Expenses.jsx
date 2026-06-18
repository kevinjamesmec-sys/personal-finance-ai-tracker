import { useState, useEffect } from "react";
import axios from "axios";

function Expenses() {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:5000/expenses", {
        user_id: 1,
        expense_name: expenseName,
        amount: amount,
        category: category,
        transaction_date: new Date().toISOString().split("T")[0],
      });

      alert("Expense added successfully");
      setExpenseName("");
      setAmount("");
      setCategory("Food");
      fetchExpenses();
    } catch (error) {
      console.error(error);
      alert("Adding expense failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="card shadow">
            <div className="card-body">

              <h2 className="mb-4">
                Expense Management
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Expense Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Expense Name"
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Amount
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

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

                <button
                  type="submit"
                  className="btn btn-danger"
                >
                  Add Expense
                </button>

              </form>

              <div className="table-responsive mt-4">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Expense Name</th>
                      <th>Amount</th>
                      <th>Category</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.id}>
                        <td>{expense.id}</td>
                        <td>{expense.expense_name}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.category}</td>
                        <td>{expense.transaction_date}</td>
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

export default Expenses;
