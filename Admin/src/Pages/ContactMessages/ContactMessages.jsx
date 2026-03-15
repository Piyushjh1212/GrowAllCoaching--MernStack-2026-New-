import React, { useEffect, useState } from 'react';
import './ContactMessageshow.css';

export default function ContactMessagesTable() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState(""); // search state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/get-Contact");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch");

        setMessages(data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <p className="cmsg-loading">Loading messages...</p>;
  if (error) return <p className="cmsg-error">{error}</p>;
  if (messages.length === 0) return <p className="cmsg-no-messages">No messages yet.</p>;

  // Filter messages by search (name or email)
  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(search.toLowerCase()) ||
    msg.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="cmsg-container">
      <h2 className="cmsg-title">Contact Messages ({filteredMessages.length})</h2>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="cmsg-search"
      />

      <div className="cmsg-table-wrapper">
        <table className="cmsg-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map(msg => (
              <tr key={msg._id} className="cmsg-row">
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                <td>{new Date(msg.createdAt).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}