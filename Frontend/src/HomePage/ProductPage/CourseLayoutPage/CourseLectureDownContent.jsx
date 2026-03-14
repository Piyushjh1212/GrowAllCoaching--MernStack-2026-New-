import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaClock, FaUserGraduate, FaVideo, FaStar } from "react-icons/fa";
import { FiShare2, FiDownload, FiStar } from "react-icons/fi";
import "./CourseLectureDownContent.css";

export default function CourseLectureDownContent() {
  const { lectureId } = useParams();
  const token = localStorage.getItem("token");

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch comments
  const fetchComments = async () => {
    if (!lectureId) return;
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/v1/get-all-comments/${lectureId}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load comments when lectureId changes
  useEffect(() => {
    fetchComments();
  }, [lectureId]);

  // Post comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Please write a comment");
      return;
    }
    if (!token) {
      alert("User not logged in");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/v1/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: comment, lectureId: lectureId }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        fetchComments(); // refresh comments
      } else {
        alert(data.message || "Failed to save comment");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };

  return (
    <>
      <div className="lecture-down-content">
        <div className="lecture-header">
          <h2>Introduction to HTML</h2>
          <button className="mark-complete">
            <FiStar /> Give Ratings
          </button>
        </div>

        <p className="lecture-description">
          Learn the structure and semantics of modern HTML5.
        </p>

        <div className="lecture-stats">
          <span>
            <FaClock /> 10 mins
          </span>
          <span>
            <FaUserGraduate /> Beginner
          </span>
          <span>
            <FaVideo /> Video
          </span>
          <span>
            <FaUserGraduate /> 2.1k students
          </span>
          <span className="rating">
            <FaStar /> 4.8
          </span>
        </div>

        <div className="lecture-actions">
          <button>
            <FiDownload /> Resources
          </button>
          <button>
            <FiShare2 /> Share
          </button>
        </div>
      </div>

      {/* Comment Section */}
      <div className="comment-section">
        <h2 className="comment-section-heading">Post Comment</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            required
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>

        {/* Comment List */}
        <div className="comment-list">
          {loading ? (
            <p>Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="no-comment">No comments yet</p>
          ) : (
            comments.map((item) => (
              <div key={item._id} className="comment-card">
                {/* Profile Icon */}
                <div className="comment-avatar">
                  <img
                    src={item.userImage || "https://i.pravatar.cc/40"}
                    alt="profile"
                  />
                </div>

                {/* Comment Content */}
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-user">
                      {item.userName || "Anonymous"}
                    </span>
                    <span className="comment-time">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : "just now"}
                    </span>
                  </div>
                  <p className="comment-text">{item.comment}</p>
                  <div className="comment-actions">
                    <span>👍 Like</span>
                    <span>💬 Reply</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}