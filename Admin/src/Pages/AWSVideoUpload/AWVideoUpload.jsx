// Video file me sanitize nhi lagta ok kyu hacker yhna attack hi nhi kerta
import React, { useState } from "react";
import "./AWSVideoUpload.css";

const AWSUploadVideo = () => {
    const [video, setVideo] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (!video) return alert("Please select a video first!");

        setUploading(true);

        const formData = new FormData();
        formData.append("video", video);

        try {
            const res = await fetch("http://localhost:5000/api/v1/AWS/Video-upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            alert(data.message);
            setVideo(null);
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="aws-upload-container">
            <h2 className="aws-upload-title">Upload Video to AWS</h2>

            {video && (
                <video
                    src={URL.createObjectURL(video)}
                    controls
                    className="aws-video-preview"
                />
            )}

            <input
                type="file"
                accept="video/*"
                className="aws-file-input"
                onChange={(e) => {
                    setVideo(e.target.files[0]);
                    e.target.value = null;
                }}
                disabled={uploading}
            />

            <button
                onClick={handleUpload}
                disabled={!video || uploading}
                className="aws-upload-btn"
            >
                {uploading ? "Uploading..." : "Upload"}
            </button>

            {uploading && (
                <p className="aws-uploading-text">Uploading video to AWS...</p>
            )}
        </div>
    );
};

export default AWSUploadVideo;