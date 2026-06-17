function Expenses() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="card shadow">
            <div className="card-body">

              <h2 className="mb-4">
                Expense Management
              </h2>

              <form>

                <div className="mb-3">
                  <label className="form-label">
                    Expense Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Expense Name"
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
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Category
                  </label>

                  <select className="form-select">
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

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Expenses;