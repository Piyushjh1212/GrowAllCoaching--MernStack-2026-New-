import React, { useEffect, useState } from 'react';
import './Css/TotalPaymentRecord.css';

export default function TotalPayment() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/Razorpay/GetPaymentList"); 
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch");
        setPayments(data.payments || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <p className="tp-loading">Loading payments...</p>;
  if (error) return <p className="tp-error">{error}</p>;
  if (payments.length === 0) return <p className="tp-no-data">No payments yet.</p>;

  // Filter by search (user id, module id, payment id)
  const filteredPayments = payments.filter(p =>
    p.user?.toLowerCase().includes(search.toLowerCase()) ||
    p.module?.toLowerCase().includes(search.toLowerCase()) ||
    p.razorpayPaymentId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tp-container">
      <h2 className="tp-title">Total Payments ({filteredPayments.length})</h2>

      <input
        type="text"
        placeholder="Search by User ID, Module ID, or Payment ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="tp-search"
      />

      <div className="tp-table-wrapper">
        <table className="tp-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Module ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Expiry Date</th>
              <th>Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((p) => (
              <tr key={p._id} className="tp-row">
                <td>{p.user}</td>
                <td>{p.module}</td>
                <td>₹{p.amount}</td>
                <td className={`tp-status ${p.status}`}>{p.status}</td>
                <td>{new Date(p.createdAt).toLocaleString()}</td>
                <td>{p.expiryDate ? new Date(p.expiryDate).toLocaleDateString() : "-"}</td>
                <td>{p.razorpayPaymentId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}