import React, { useEffect, useState } from 'react';
import './ContactMessageshow.css';

export default function ContactMessagesTable() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/get-Contact");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch");

        setMessages(data.data); // array of messages
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <p className="loading">Loading messages...</p>;
  if (error) return <p className="error">{error}</p>;
  if (messages.length === 0) return <p className="no-messages">No messages yet.</p>;

  return (
    <div className="contact-table-container">
      <h2>Contact Messages</h2>
      <table className="contact-table">
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
          {messages.map(msg => (
            <tr key={msg._id}>
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
  );
}