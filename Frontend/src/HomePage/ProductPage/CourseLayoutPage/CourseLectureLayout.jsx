import React, { useState, useRef } from "react";
import "./CourseLayoutPage.css"; // corrected to CSS
import CourseLectureDownContent from "./CourseLectureDownContent.jsx";

export default function CourseContent() {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [language, setLanguage] = useState("English");

  /* PLAY / PAUSE */
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  /* UPDATE PROGRESS */
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);
  };

  /* SEEK */
  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const seekTo = (e.target.value / 100) * video.duration;
    video.currentTime = seekTo;
    setProgress(e.target.value);
  };

  /* FORWARD / BACK */
  const forward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime += 10;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const backward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime -= 10;
    setProgress((video.currentTime / video.duration) * 100);
  };

  /* FULLSCREEN */
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      wrapperRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  /* FORMAT TIME */
  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  /* SET PLAYBACK SPEED */
  const changeSpeed = (rate) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  return (
    <div className="vp-container">
      <div className="vp-wrapper" ref={wrapperRef}>
        <video
          ref={videoRef}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          className="vp-video"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() =>
            setDuration(videoRef.current?.duration || 0)
          }
        />

        {/* CONTROLS */}
        <div className="vp-controls">

          {/* PROGRESS BAR */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="vp-progress"
          />

          <div className="vp-bottom">
            <div className="vp-left">
              <button onClick={togglePlay}>
                {isPlaying ? "❚❚" : "▶"}
              </button>
              <button onClick={backward}>⏪</button>
              <button onClick={forward}>⏩</button>

              <span className="vp-time">
                {formatTime(videoRef.current?.currentTime)} /
                {formatTime(duration)}
              </span>
            </div>

            <div className="vp-right">
              {/* SETTINGS */}
              <div className="vp-settings">
                <button onClick={() => setShowSettings(!showSettings)}>
                  ⚙
                </button>

                {showSettings && (
                  <div className="vp-settings-menu">
                    <div>
                      <p>Speed</p>
                      {[0.5, 1, 1.5, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => changeSpeed(rate)}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>

                    <div>
                      <p>Language</p>
                      {["English", "Hindi", "Spanish"].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button onClick={toggleFullscreen}>⛶</button>
            </div>
          </div>
        </div>
      </div>
      <CourseLectureDownContent />
    </div>
  );
}