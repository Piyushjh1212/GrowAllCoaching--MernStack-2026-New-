import React, { useState } from "react";

const UploadVideo = () => {
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

            if (!res.ok) {
                let errMsg = "Upload failed";
                try {
                    const errData = await res.json();
                    errMsg = errData.message || errMsg;
                } catch (parseError) {
                    console.error("Failed to parse error response:", parseError);
                }
                throw new Error(errMsg);
            }

            const data = await res.json();
            alert(data.message);
            setVideo(null); // reset input
        } catch (err) {
            console.error(err);
            alert(err.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "20px auto", textAlign: "center" }}>
            <h2>Upload Video</h2>

            {/* Video Preview */}
            {video && (
                <video
                    src={URL.createObjectURL(video)}
                    controls
                    width="100%"
                    style={{ marginBottom: "10px" }}
                />
            )}

            {/* Video Input */}
            <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                    setVideo(e.target.files[0]);
                    e.target.value = null;
                }}
                disabled={uploading}
                style={{ margin: "10px 0", width: "100%" }}
            />

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                disabled={!video || uploading}
                style={{
                    padding: "10px 20px",
                    width: "100%",
                    cursor: !video || uploading ? "not-allowed" : "pointer",
                }}
            >
                {uploading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
};

export default UploadVideo;