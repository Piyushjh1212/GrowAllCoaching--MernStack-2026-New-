import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardHome = () => {

    const [totalMessages, setTotalMessages] = useState(0);
    const [totalSuspiciousLogs, setTotalSuspiciousLogs] = useState(0);
    const [totalUserCount, setTotalUserCount] = useState(0);
    const [totalPaymentCount, setTotalPaymentCount] = useState(0);

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await fetch("http://localhost:5000/api/v1/messages-count");
            const data = await res.json();
            setTotalMessages(data.count);
        };
        fetchMessages();
    }, []);

    useEffect(() => {
        const fetchLogs = async () => {
            const res = await fetch("http://localhost:5000/api/v1/totalsuspiouslogs-count");
            const data = await res.json();
            setTotalSuspiciousLogs(data.count);
        };
        fetchLogs();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token"); // ya jaha aap token save kar rahe ho
                const res = await fetch("http://localhost:5000/api/v1/UserLoginSignup/totalUser-count", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`  // token send karna zaruri
                    }
                });

                if (res.status === 401) throw new Error("Unauthorized! Login first.");

                const data = await res.json();
                setTotalUserCount(data.count);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchRevenue = async () => {
            const token = localStorage.getItem("token"); // login ke time save kiya token
            if (!token) return; // agar token nahi, to fetch na kare

            try {
                const res = await fetch(
                    "http://localhost:5000/api/v1/Razorpay/totalrevenueCount",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    console.error("Error fetching revenue:", data.message);
                    return;
                }

                setTotalPaymentCount(data.totalAmount);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchRevenue();
    }, []);

    const formatIndianNumber = (num) => {
        if (num >= 10000000) return (num / 10000000).toFixed(1) + " Cr";
        if (num >= 100000) return (num / 100000).toFixed(1) + " L";
        if (num >= 1000) return (num / 1000).toFixed(1) + " K";
        return num;
    };

    const stats = [
        { title: "Total Courses", value: 3, link: "/admin/Totalcourses" },
        { title: "Total Modules", value: 9, link: "/admin/TotalModule" },
        { title: "Total Lectures", value: 27, link: "/admin/TotalLectures" },
        { title: "Total Users", value: totalUserCount, link: "/admin/TotalUsers" },
        { title: "Total Revenue", value: formatIndianNumber(totalPaymentCount), link: "/admin/TotalPayment" },
        { title: "Total Messages", value: totalMessages, link: "/admin/messages" },
        { title: "Total Attacks", value: totalSuspiciousLogs, link: "/admin/suspicious" },
    ];

    return (
        <>
            <h1>Dashboard</h1>
            <p>Welcome, Admin! Here's a quick overview:</p>

            <div className="stats-cards">
                {stats.map((stat, idx) => (
                    <Link key={idx} to={stat.link} className="stat-card">
                        <h3>{stat.title}</h3>
                        <p>{stat.value}</p>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default DashboardHome;