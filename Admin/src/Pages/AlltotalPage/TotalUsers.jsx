import React, { useState, useEffect } from "react";
import "./Css/TotalUsers.css";

export default function TotalUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token"); // login ke time store kiya hua token
                const res = await fetch(
                    "http://localhost:5000/api/v1/UserLoginSignup/Get-all-theUser",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}` // token send karna zaruri
                        },
                    }
                );

                if (res.status === 401) throw new Error("Unauthorized! Login first.");

                const data = await res.json();
                setUsers(data.users); // API se user list
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>Error: {error}</div>;

    // Filter users by search
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="tu-container">
            <h2 className="tu-heading">Total Users {filteredUsers.length}</h2>

            <input
                type="text"
                placeholder="Search user by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="tu-search"
            />

            <table className="tu-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user._id || index} className="tu-row">
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user._id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}