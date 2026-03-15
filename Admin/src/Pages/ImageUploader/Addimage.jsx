import React, { useState } from "react";
import "./Addimage.css";

export default function Addimages() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Select an image first!");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/v1/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Image uploaded successfully!");
        console.log("Cloudinary URL:", data.url);
      } else {
        alert("Upload failed: " + data.message);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="addimg-container">
      <h2 className="addimg-title">Upload Module Image</h2>

      <input
        className="addimg-input"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />

      <button
        className="addimg-button"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload to Cloudinary"}
      </button>

      {preview && (
        <div className="addimg-preview">
          <img className="addimg-preview-img" src={preview} alt="Preview" />
        </div>
      )}
    </div>
  );
}