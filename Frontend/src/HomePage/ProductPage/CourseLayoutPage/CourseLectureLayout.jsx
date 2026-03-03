import React, { useRef, useEffect, useState } from "react";
import { FaCog, FaExpand, FaCompress } from "react-icons/fa";
import CourseLectureDownContent from "./CourseLectureDownContent"
import "./CourseLayoutPage.css";

export default function CourseLectureLayout({ selectedVideo }) {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    if (videoRef.current && selectedVideo) {
      videoRef.current.load();
      setProgress(0);
      setDuration(0);
      setIsPlaying(false);
      setPlaybackRate(1);
    }
  }, [selectedVideo]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e) => {
    if (!videoRef.current) return;
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    videoRef.current.currentTime = newTime;
  };

  const toggleFullScreen = () => {
    if (!wrapperRef.current) return;

    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="vp-container">
      <div className="vp-wrapper" ref={wrapperRef}>
        {selectedVideo ? (
          <>
            <video
              ref={videoRef}
              src={selectedVideo}
              className="vp-video"
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

            {/* CONTROLS */}
            <div className="vp-controls">
              {/* PROGRESS BAR */}
              <div className="vp-progress-bar" onClick={handleProgressClick}>
                <div
                  className="vp-progress-filled"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* BOTTOM CONTROL BAR */}
              <div className="vp-bottom">
                <div className="vp-left">
                  <button className="vp-play-btn" onClick={togglePlay}>
                    {isPlaying ? "⏸️" : "▶️"}
                  </button>
                  <span className="vp-time">
                    {formatTime(videoRef.current?.currentTime || 0)} /{" "}
                    {formatTime(duration)}
                  </span>
                </div>

                <div className="vp-right">
                  {/* SETTINGS */}
                  <div className="vp-settings">
                    <button onClick={() => setShowSettings(!showSettings)}>
                      <FaCog />
                    </button>
                    {showSettings && (
                      <div className="vp-settings-menu">
                        {/* Subtitles / CC */}
                        <button onClick={() => alert("Subtitles options clicked")}>
                          Subtitles / CC
                        </button>

                        {/* Playback Speed */}
                        <button
                          onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                          className="vp-speed-button"
                        >
                          Playback speed ({playbackRate}x)
                        </button>

                        {showSpeedMenu && (
                          <div className="vp-speed-menu">
                            <h4>Playback speed</h4>
                            <div className="vp-speed-current">
                              {playbackRate.toFixed(2)}x
                            </div>
                            <div className="vp-speed-slider">
                              <button
                                onClick={() =>
                                  setPlaybackRate((prev) => Math.max(0.25, prev - 0.25))
                                }
                              >
                                -
                              </button>
                              <input
                                type="range"
                                min="0.25"
                                max="3"
                                step="0.05"
                                value={playbackRate}
                                onChange={(e) =>
                                  setPlaybackRate(parseFloat(e.target.value))
                                }
                              />
                              <button
                                onClick={() =>
                                  setPlaybackRate((prev) => Math.min(3, prev + 0.25))
                                }
                              >
                                +
                              </button>
                            </div>
                            <div className="vp-speed-presets">
                              {[1, 1.25, 1.5, 2, 3].map((speed) => (
                                <button
                                  key={speed}
                                  className={speed === playbackRate ? "active" : ""}
                                  onClick={() => setPlaybackRate(speed)}
                                >
                                  {speed}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Quality (placeholder) */}
                        <p>Video Quality</p>
                        <button onClick={() => alert("Quality options clicked")}>
                          Auto (1080p HD)
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Fullscreen */}
                  <button onClick={toggleFullScreen}>
                    {isFullScreen ? <FaCompress /> : <FaExpand />}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Please select a lecture to play</p>
        )}
      </div>
      <CourseLectureDownContent />
    </div>
  );
}