import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Session expired! Please log in again.");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error(error.response?.data?.message || "Session expired! Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // Logout handler to be reused
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.info("Logged out successfully!");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">Dashboard</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/dashboard">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile">Profile</a>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mt-5">
        <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
          <div className="container-fluid py-5 text-center">
            <h1 className="display-5 fw-bold">Welcome, {user?.name || "Guest"}!</h1>
            <p className="col-md-8 fs-4 mx-auto">
              Enjoy your personalized dashboard where you can manage your account, view your data, and explore our awesome features.
            </p>
            <button className="btn btn-primary btn-lg" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <div className="container">
          <small>&copy; {new Date().getFullYear()} BIGSAMOFAFRICA. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
