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
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedSubtitle, setSelectedSubtitle] = useState("off");

  const [quality, setQuality] = useState("1080");

  const videoSources = {
    "1080": selectedVideo?.["1080"],
    "720": selectedVideo?.["720"],
    "480": selectedVideo?.["480"],
    "360": selectedVideo?.["360"]
  };

  // reload video when video or quality changes
  useEffect(() => {
    if (videoRef.current && selectedVideo) {

      const savedTime = currentTime;

      videoRef.current.load();

      videoRef.current.onloadedmetadata = () => {
        videoRef.current.currentTime = savedTime;

        if (isPlaying) {
          videoRef.current.play();
        }
      };
    }
  }, [selectedVideo, quality, currentTime, isPlaying]);

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
      const track = tracks[i];

      if (lang === "off") track.mode = "disabled";
      else track.mode = track.language === lang ? "showing" : "disabled";
    }

    setSelectedSubtitle(lang);
  };

  return (


      <div className="gac-vp-wrapper" ref={wrapperRef}>

        {selectedVideo ? (
          <>
            <video
              ref={videoRef}
              src={videoSources[quality]}
              className="gac-vp-video"
              onTimeUpdate={() => {

                if (!videoRef.current) return;

                const time = videoRef.current.currentTime;

                setCurrentTime(time);

                setProgress(
                  (time / videoRef.current.duration) * 100
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

            <div className="gac-vp-controls">

              <div className="gac-vp-progress-bar" onClick={handleProgressClick}>
                <div
                  className="gac-vp-progress-filled"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="gac-vp-bottom">

                <div className="gac-vp-left">

                  <button className="gac-vp-play-btn" onClick={togglePlay}>
                    {isPlaying ? "⏸️" : "▶️"}
                  </button>

                  <span className="gac-vp-time">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>

                </div>

                <div className="gac-vp-right">

                  <div className="gac-vp-settings">

                    <button onClick={() => setShowSettings(!showSettings)}>
                      <FaCog />
                    </button>

                    {showSettings && (
                      <div className="gac-vp-settings-menu">

                        <button
                          onClick={() => setShowSubtitleMenu(!showSubtitleMenu)}
                        >
                          Subtitles / CC
                        </button>

                        {showSubtitleMenu && (
                          <div className="gac-vp-subtitle-menu">

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

                        <button
                          onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                        >
                          Playback speed ({playbackRate}x)
                        </button>

                        {showSpeedMenu && (
                          <div className="gac-vp-speed-menu">
                            {[0.5, 1, 1.25, 1.5, 2].map((speed) => (
                              <button
                                key={speed}
                                onClick={() => setPlaybackRate(speed)}
                              >
                                {speed}x
                              </button>
                            ))}
                          </div>
                        )}

                        <p>Video Quality</p>

                        <button
                          onClick={() => setShowQualityMenu(!showQualityMenu)}
                        >
                          {quality}p
                        </button>

                        {showQualityMenu && (
                          <div className="gac-vp-quality-menu">

                            {["1080", "720", "480", "360"].map((q) => (
                              <button
                                key={q}
                                onClick={() => {
                                  setQuality(q);
                                  setShowQualityMenu(false);
                                }}
                              >
                                {q}p
                              </button>
                            ))}

                          </div>
                        )}

                      </div>
                    )}

                  </div>

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
  );

}

