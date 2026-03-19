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

  // 🔥 Reload video when URL changes
  useEffect(() => {
    if (videoRef.current && selectedVideo) {
      videoRef.current.pause(); // ✅ stop previous
      videoRef.current.load();
      setProgress(0);
      setDuration(0);
      setCurrentTime(0);
      setIsPlaying(false);
      setPlaybackRate(1);
    }
  }, [selectedVideo]);

  // 🔥 Playback speed apply
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // 🔥 Sync fullscreen state (ESC press handle)
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const togglePlay = async () => {
    if (!videoRef.current) return;

    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        await videoRef.current.play(); // ✅ promise handle
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Play error:", err);
    }
  };

  const handleProgressClick = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleFullScreen = () => {
    if (!wrapperRef.current) return;

    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSubtitleChange = (lang) => {
    if (!videoRef.current) return;

    const tracks = videoRef.current.textTracks;

    for (let i = 0; i < tracks.length; i++) {
      if (lang === "off") {
        tracks[i].mode = "disabled";
      } else {
        tracks[i].mode =
          tracks[i].language === lang ? "showing" : "disabled";
      }
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
              controls={false} // 🔥 custom controls
              onTimeUpdate={() => {
                if (!videoRef.current) return;

                const current = videoRef.current.currentTime;
                const total = videoRef.current.duration;

                setCurrentTime(current);
                setProgress(total ? (current / total) * 100 : 0);
              }}
              onLoadedMetadata={() =>
                setDuration(videoRef.current?.duration || 0)
              }
              onEnded={() => setIsPlaying(false)} // 🔥 important
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
                <div
                  className="vp-progress-filled"
                  style={{ width: `${progress}%` }}
                />
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
                        <button
                          onClick={() =>
                            setShowSubtitleMenu(!showSubtitleMenu)
                          }
                        >
                          Subtitles ({selectedSubtitle})
                        </button>

                        {showSubtitleMenu && (
                          <div className="vp-subtitle-menu">
                            <button
                              className={
                                selectedSubtitle === "off" ? "active" : ""
                              }
                              onClick={() => handleSubtitleChange("off")}
                            >
                              Off
                            </button>

                            {subtitleTracks?.map((sub) => (
                              <button
                                key={sub.lang}
                                className={
                                  selectedSubtitle === sub.lang ? "active" : ""
                                }
                                onClick={() =>
                                  handleSubtitleChange(sub.lang)
                                }
                              >
                                {sub.label}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Speed */}
                        <button
                          onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                        >
                          Speed ({playbackRate}x)
                        </button>

                        {showSpeedMenu && (
                          <div className="vp-speed-menu">
                            {[0.5, 1, 1.25, 1.5, 2].map((speed) => (
                              <button
                                key={speed}
                                className={
                                  speed === playbackRate ? "active" : ""
                                }
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

                  {/* FULLSCREEN */}
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