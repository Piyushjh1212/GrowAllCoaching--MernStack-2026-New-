import React, { useRef, useEffect, useState } from "react";
import "./CourseLayoutPage.css";

export default function CourseLectureLayout({ selectedVideo }) {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current && selectedVideo) {
      videoRef.current.load();
      setProgress(0);
      setDuration(0);
      setIsPlaying(false);
    }
  }, [selectedVideo]);

  return (
    <div className="vp-container">
      <div className="vp-wrapper">
        {selectedVideo ? (
          <video
            ref={videoRef}
            src={selectedVideo}
            className="vp-video"
            controls
            autoPlay
            onTimeUpdate={() => {
              if (!videoRef.current) return;
              setProgress(
                (videoRef.current.currentTime / videoRef.current.duration) * 100
              );
            }}
            onLoadedMetadata={() =>
              setDuration(videoRef.current?.duration || 0)
            }
          />
        ) : (
          <p>Please select a lecture to play</p>
        )}
      </div>
    </div>
  );
}