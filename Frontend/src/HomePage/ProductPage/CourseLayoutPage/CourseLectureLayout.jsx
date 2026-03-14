import React, { useRef, useEffect, useState } from "react";
import { FaCog, FaExpand, FaCompress } from "react-icons/fa";
import "./CourseLayoutPage.css";

export default function CourseLectureLayout({ selectedVideo, subtitleTracks }) {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showSubtitleMenu, setShowSubtitleMenu] = useState(false);

  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedSubtitle, setSelectedSubtitle] = useState("off");

  // Reload video when selectedVideo changes
  useEffect(() => {
    if (videoRef.current && selectedVideo) {
      videoRef.current.load();
      setProgress(0);
      setDuration(0);
      setCurrentTime(0);
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
    setCurrentTime(newTime);
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

  const handleSubtitleChange = (lang) => {
    if (!videoRef.current) return;
    const tracks = videoRef.current.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = tracks[i].language === lang ? "showing" : "disabled";
    }
    setSelectedSubtitle(lang);
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
                setCurrentTime(videoRef.current.currentTime);
                setProgress(
                  (videoRef.current.currentTime / videoRef.current.duration) * 100
                );
              }}
              onLoadedMetadata={() =>
                setDuration(videoRef.current?.duration || 0)
              }
            >
              {subtitleTracks?.map((sub) => (
                <track
                  key={sub.lang}
                  src={sub.src}
                  kind="subtitles"
                  srcLang={sub.lang}
                  label={sub.label}
                />
              ))}
            </video>

            {/* CONTROLS */}
            <div className="vp-controls">
              {/* PROGRESS BAR */}
              <div className="vp-progress-bar" onClick={handleProgressClick}>
                <div className="vp-progress-filled" style={{ width: `${progress}%` }} />
              </div>

              {/* BOTTOM BAR */}
              <div className="vp-bottom">
                <div className="vp-left">
                  <button className="vp-play-btn" onClick={togglePlay}>
                    {isPlaying ? "⏸️" : "▶️"}
                  </button>
                  <span className="vp-time">
                    {formatTime(currentTime)} / {formatTime(duration)}
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
                        {/* Subtitles */}
                        <button onClick={() => setShowSubtitleMenu(!showSubtitleMenu)}>
                          Subtitles / CC ({selectedSubtitle})
                        </button>
                        {showSubtitleMenu && (
                          <div className="vp-subtitle-menu">
                            <button
                              className={selectedSubtitle === "off" ? "active" : ""}
                              onClick={() => handleSubtitleChange("off")}
                            >
                              Off
                            </button>
                            {subtitleTracks?.map((sub) => (
                              <button
                                key={sub.lang}
                                className={selectedSubtitle === sub.lang ? "active" : ""}
                                onClick={() => handleSubtitleChange(sub.lang)}
                              >
                                {sub.label}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Playback speed */}
                        <button onClick={() => setShowSpeedMenu(!showSpeedMenu)}>
                          Playback speed ({playbackRate}x)
                        </button>
                        {showSpeedMenu && (
                          <div className="vp-speed-menu">
                            {[0.5, 1, 1.25, 1.5, 2].map((speed) => (
                              <button
                                key={speed}
                                className={speed === playbackRate ? "active" : ""}
                                onClick={() => setPlaybackRate(speed)}
                              >
                                {speed}x
                              </button>
                            ))}
                          </div>
                        )}
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
    </div>
  );
}