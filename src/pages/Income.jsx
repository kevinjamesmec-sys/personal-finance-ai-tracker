import { useState, useEffect } from "react";
import axios from "axios";

function Income() {
  const [amount, setAmount] = useState("");
  const [incomes, setIncomes] = useState([]);

  const fetchIncome = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/income");
      setIncomes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:5000/income", {
        user_id: 1,
        amount: amount,
      });

      alert("Income saved successfully");
      setAmount("");
      fetchIncome();
    } catch (error) {
      console.error(error);
      alert("Saving income failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow">
            <div className="card-body">

              <h2 className="mb-4">
                Income Management
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Monthly Income
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Monthly Income"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Save Income
                </button>

              </form>

              <div className="table-responsive mt-4">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomes.map((income) => (
                      <tr key={income.id}>
                        <td>{income.id}</td>
                        <td>{income.amount}</td>
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

export default Income;
