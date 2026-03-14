import React, { useEffect, useState } from "react";
import Dashboard from "../Pages/Dashboard/Dashboard";

const AdminDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/admin/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const result = await res.json();
        setData(result);

      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, []);

  return (
   <Dashboard/>
  );
};

export default AdminDashboard;