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

  return (
    <div className="container mt-5 text-center">
      <h1>Welcome, {user?.name || "Guest"}!</h1>
      <button
        className="btn btn-danger mt-3"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
          toast.info("Logged out successfully!");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
