function Insights() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">
        AI Financial Insights
      </h1>

      <div className="card shadow mb-4">
        <div className="card-body">
          <h4>Spending Analysis</h4>

          <div className="alert alert-info">
            You spent 35% of your monthly income on food.
          </div>

          <div className="alert alert-warning">
            Entertainment spending exceeded your budget by 20%.
          </div>

          <div className="alert alert-success">
            Shopping expenses were lower than last month.
          </div>
        </div>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          <h4>Savings Summary</h4>

          <table className="table">
            <tbody>
              <tr>
                <td>Monthly Income</td>
                <td>₹50,000</td>
              </tr>

              <tr>
                <td>Monthly Expenses</td>
                <td>₹35,000</td>
              </tr>

              <tr>
                <td>Available Savings</td>
                <td>₹15,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card shadow">
        <div className="card-body">
          <h4>Investment Recommendations</h4>

          <ul className="list-group">
            <li className="list-group-item">
              Emergency Fund: ₹5,000
            </li>

            <li className="list-group-item">
              SIP Investment: ₹7,000
            </li>

            <li className="list-group-item">
              Savings Account: ₹3,000
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Insights;