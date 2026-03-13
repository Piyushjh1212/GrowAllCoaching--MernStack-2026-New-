// pages/SecurityDashboard.jsx
import { useEffect, useState } from "react";
import "./suspicious.css"

const SecuritySuspiciousDashboard = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch("http://localhost:5000/api/v1/Suspious/logs", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch logs");
                }

                const data = await res.json();
                setLogs(data);
            } catch (err) {
                console.error("Error fetching security logs:", err.message);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div className="ss-security-dashboard">
            <h2>Security Dashboard</h2>
            <div className="ss-security-dashboard-table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Endpoint</th>
                            <th>Method</th>
                            <th>User</th>
                            <th>Type</th>
                            <th>Message</th>
                            <th>IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>
                                    No logs found
                                </td>
                            </tr>
                        ) : (
                            logs.map((log) => (
                                <tr key={log._id}>
                                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                                    <td>{log.endpoint}</td>
                                    <td>{log.method}</td>
                                    <td>{log.userId || "Guest"}</td>
                                    <td>{log.type}</td>
                                    <td>{log.message || "-"}</td>
                                    <td>{log.ip}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SecuritySuspiciousDashboard;