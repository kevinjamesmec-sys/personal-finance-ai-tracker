import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <span className="navbar-brand">
          Personal Finance AI Tracker
        </span>

        <div className="navbar-nav">
          {user ? (
            <>
              <span className="nav-link text-white">Welcome, {user?.name}</span>

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

              <Link className="nav-link" to="/upload">
                Upload CSV
              </Link>

              <Link className="nav-link" to="/insights">
                Insights
              </Link>

              <button
                type="button"
                className="btn btn-outline-light ms-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/">
                Login
              </Link>

              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
