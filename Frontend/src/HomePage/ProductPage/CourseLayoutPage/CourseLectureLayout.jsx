import React, { useRef, useEffect, useState } from "react";
import { FaCog, FaExpand, FaCompress } from "react-icons/fa";
<<<<<<< HEAD
import "./CourseLayoutPage.css";

export default function CourseLectureLayout({ selectedVideo, subtitleTracks }) {

=======
import CourseLectureDownContent from "./CourseLectureDownContent"
import "./CourseLayoutPage.css";

export default function CourseLectureLayout({ selectedVideo }) {
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
<<<<<<< HEAD
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
=======
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
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  const togglePlay = () => {
    if (!videoRef.current) return;
<<<<<<< HEAD

=======
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
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
<<<<<<< HEAD

    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    const newTime = (clickX / rect.width) * duration;

    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
=======
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    videoRef.current.currentTime = newTime;
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
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
<<<<<<< HEAD

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

=======
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="vp-container">
      <div className="vp-wrapper" ref={wrapperRef}>
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
        {selectedVideo ? (
          <>
            <video
              ref={videoRef}
<<<<<<< HEAD
              src={videoSources[quality]}
              className="gac-vp-video"
              onTimeUpdate={() => {

                if (!videoRef.current) return;

                const time = videoRef.current.currentTime;

                setCurrentTime(time);

                setProgress(
                  (time / videoRef.current.duration) * 100
=======
              src={selectedVideo}
              className="vp-video"
              onTimeUpdate={() => {
                if (!videoRef.current) return;
                setProgress(
                  (videoRef.current.currentTime / videoRef.current.duration) * 100
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
                );
              }}
              onLoadedMetadata={() =>
                setDuration(videoRef.current?.duration || 0)
              }
<<<<<<< HEAD
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
=======
            />

            {/* CONTROLS */}
            <div className="vp-controls">
              {/* PROGRESS BAR */}
              <div className="vp-progress-bar" onClick={handleProgressClick}>
                <div
                  className="vp-progress-filled"
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

<<<<<<< HEAD
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
=======
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
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
                        >
                          Playback speed ({playbackRate}x)
                        </button>

                        {showSpeedMenu && (
<<<<<<< HEAD
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

=======
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
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
            </div>
          </>
        ) : (
          <p>Please select a lecture to play</p>
        )}
<<<<<<< HEAD

      </div>
  );

}

=======
      </div>
      <CourseLectureDownContent />
    </div>
  );
}
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
