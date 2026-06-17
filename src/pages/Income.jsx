function Income() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow">
            <div className="card-body">

              <h2 className="mb-4">
                Income Management
              </h2>

              <form>

                <div className="mb-3">
                  <label className="form-label">
                    Monthly Income
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Monthly Income"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Save Income
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Income;