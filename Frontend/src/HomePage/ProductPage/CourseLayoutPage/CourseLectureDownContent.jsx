import React from "react";
import { FaClock, FaUserGraduate, FaVideo, FaStar } from "react-icons/fa";
import { FiShare2, FiDownload, FiStar } from "react-icons/fi";
import "./CourseLectureDownContent.css";

export default function CourseLectureDownContent() {
    return (
        <>
            <div className="lecture-down-content">
                {/* Header */}
                <div className="lecture-header">
                    <h2>Introduction to HTML</h2>
                    <button className="mark-complete">
                        <FiStar /> Give Ratings
                    </button>
                </div>

                {/* Description */}
                <p className="lecture-description">
                    Learn the structure and semantics of modern HTML5. Understand document
                    structure, semantic elements, and best practices for accessible web
                    development.
                </p>

                {/* Stats */}
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

                {/* Actions */}
                <div className="lecture-actions">
                    <button>
                        <FiDownload /> Resources
                    </button>
                    <button>
                        <FiShare2 /> Share
                    </button>
                </div>
            </div>
            <div className="lecture-comments">
                <h3>Discussion</h3>

                {/* Comment Input */}
                <div>

                </div>
                <div className="comment-input">
                    <input type="text" placeholder="Write a comment..." />
                    <button>Comment</button>
                </div>

                {/* Comment List */}
                <div className="comments-list">
                    <div className="comment">
                        <strong>Piyush Jhariya:</strong> Great lecture, really clear!
                    </div>
                    <div className="comment">
                        <strong>Student123:</strong> Can you explain semantic tags again?
                    </div>
                    <div className="comment">
                        <strong>Swastika:</strong> Can you explain semantic tags again?
                    </div>
                    <div className="comment">
                        <strong>minal Singh:</strong> Can you explain semantic tags again?
                    </div>
                    <div className="comment">
                        <strong>kuldeep Mishra:</strong> Can you explain semantic tags again?
                    </div>
                    <div className="comment">
                        <strong>Prince:</strong> Can you explain semantic tags again?
                    </div>
                    <div className="comment">
                        <strong>Kunal:</strong> Can you explain semantic tags again?
                    </div>
                    <div className="comment">
                        <strong>Akhil Rahangdale:</strong> Can you explain semantic tags again?
                    </div>
                    <div className="comment">
                        <strong>Ies ke Yadavji:</strong> Can you explain semantic tags again?
                    </div>
                </div>
            </div>
        </>

    );
}