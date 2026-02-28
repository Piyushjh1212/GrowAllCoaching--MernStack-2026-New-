import React, { useState } from "react";
import "./Addvideo.css";
export default function AddVideo() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0); // in %
  const [uploadedMB, setUploadedMB] = useState(0); // uploaded size in MB

  // File select handler
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }

    // reset progress
    setProgress(0);
    setUploadedMB(0);
  };

  // Upload handler with progress
  const handleUpload = () => {
    if (!file) return alert("Select a video first!");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setProgress(percent);
        setUploadedMB((e.loaded / (1024 * 1024)).toFixed(2)); // MB
      }
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        setUploading(false);
        if (xhr.status === 201 || xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          alert("Video uploaded successfully!");
          console.log("Cloudinary URL:", data.url);
        } else {
          alert("Upload failed. See console.");
          console.error("Upload error:", xhr.responseText);
        }
      }
    };

    xhr.open("POST", "http://localhost:5000/api/v1/cloudinary/upload-video");
    xhr.send(formData);
  };

  return (
   <div className="add-video-container">
  <h2>Upload Video</h2>
  <input type="file" accept="video/*" onChange={handleFileChange} />
  <button onClick={handleUpload} disabled={uploading}>
    {uploading ? `Uploading ${progress}%` : "Upload Video"}
  </button>

  {uploading && (
    <div className="add-video-progress">
      <p>{progress}% uploaded ({uploadedMB} MB)</p>
      <progress value={progress} max="100" />
    </div>
  )}

  {preview && (
    <div className="add-video-preview">
      <video controls>
        <source src={preview} type={file?.type} />
        Your browser does not support the video tag.
      </video>
    </div>
  )}
</div>
  );
}