import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <span className="navbar-brand">
          Personal Finance AI Tracker
        </span>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Login
          </Link>

          <Link className="nav-link" to="/register">
            Register
          </Link>

          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>

          <Link className="nav-link" to="/income">
            Income
          </Link>

          <Link className="nav-link" to="/expenses">
            Expenses
          </Link>

          <Link className="nav-link" to="/budget">
            Budget
          </Link>

          <Link className="nav-link" to="/insights">
            Insights
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;