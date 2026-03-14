import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseLayoutPage.css";
<<<<<<< HEAD
import "./CourseLectureDownContent.css";
import CourseLectureLayout from "./CourseLectureLayout";
import { CourseLectureSidebar } from "./CourseLectureSidebar";
import CourseLectureDownContent from "./CourseLectureDownContent";
=======
import CourseLectureLayout from "./CourseLectureLayout";
import { CourseLectureSidebar } from "./CourseLectureSidebar";
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c

export default function CoursemainLayout() {

  const { courseId, moduleId, lectureId } = useParams();
  const navigate = useNavigate();

  const [modules, setModules] = useState([]);
  const [currentModuleId, setCurrentModuleId] = useState(moduleId || null);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [selectedVideo, setSelectedVideo] = useState(null);


=======
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c

  // ---------------- FETCH MODULES ----------------
  useEffect(() => {

    const fetchModules = async () => {

      try {

        const res = await fetch(
          `http://localhost:5000/api/v1/Courses/${courseId}/modules-with-lectures`
        );

        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {

          setModules(data);

<<<<<<< HEAD
          const firstModule = data[0];
          const firstLecture =
            firstModule.lectures?.[0] || firstModule.lessons?.[0];

          // ✅ AUTO SELECT FIRST LECTURE
          if (!lectureId && firstLecture) {

            navigate(
              `/course/${courseId}/module/${firstModule._id}/lecture/${firstLecture._id}`,
              { replace: true }
            );

          }

          // set current module
          if (!moduleId) {
            setCurrentModuleId(firstModule._id);
=======
          if (!moduleId) {
            setCurrentModuleId(data[0]._id);
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
          }

        }

        setLoading(false);

      } catch (error) {

        console.error("Error fetching modules:", error);
        setLoading(false);

      }

    };

    if (courseId) {
      fetchModules();
    }

<<<<<<< HEAD
  }, [courseId, lectureId, moduleId, navigate]);
=======
  }, [courseId, moduleId]);
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c



  // ---------------- UPDATE URL WHEN MODULE CHANGE ----------------
  useEffect(() => {

    if (!currentModuleId) return;

    if (currentModuleId !== moduleId) {

      navigate(
        `/course/${courseId}/module/${currentModuleId}`,
        { replace: true }
      );

    }

  }, [currentModuleId, navigate, courseId, moduleId]);



  // ---------------- FIND CURRENT LECTURE ----------------
  const selectedLecture = useMemo(() => {

    if (!lectureId || modules.length === 0) return null;

    for (let module of modules) {

      const lecture = module.lectures?.find(
        (lec) => lec._id.toString() === lectureId.toString()
      );

      const lesson = module.lessons?.find(
        (lec) => lec._id.toString() === lectureId.toString()
      );

      const selected = lecture || lesson;

      if (selected) {
        return selected;
      }

    }

    return null;

  }, [lectureId, modules]);


<<<<<<< HEAD
=======
  const selectedVideo = selectedLecture?.videoUrl || null;
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
  const currentLectureId = selectedLecture?._id || null;



<<<<<<< HEAD
  // ---------------- FETCH VIDEO ----------------
  useEffect(() => {

    const fetchVideoURL = async () => {

      if (!selectedLecture) return;

      if (selectedLecture.videoKey) {

        try {

          const res = await fetch(
            `http://localhost:5000/api/presigned/video/${selectedLecture._id}`
          );

          const data = await res.json();

          console.log("Received pre-signed URL:", data.videoURL);

          setSelectedVideo(data.videoURL || null);

        } catch (err) {

          console.error("Failed to fetch pre-signed URL", err);
          setSelectedVideo(null);

        }

      }

      else if (selectedLecture.videoUrl) {

        console.log("Using direct videoUrl:", selectedLecture.videoUrl);

        setSelectedVideo(selectedLecture.videoUrl);

      }

      else {

        console.log("No video available");

        setSelectedVideo(null);

      }

    };

    fetchVideoURL();

  }, [selectedLecture]);



=======
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
  // ---------------- LOADING ----------------
  if (loading) return <p>Loading modules...</p>;



  return (

    <div className="Course-main-Layout-container">

<<<<<<< HEAD
      {/* VIDEO PLAYER */}
=======
      {/* ---------------- VIDEO PLAYER ---------------- */}

>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
      <div className="course-main-layout-left-container">

        <CourseLectureLayout
          selectedVideo={selectedVideo}
          currentLectureId={currentLectureId}
        />

<<<<<<< HEAD
        <CourseLectureDownContent />

=======
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
      </div>



<<<<<<< HEAD
      {/* SIDEBAR */}
=======
      {/* ---------------- SIDEBAR ---------------- */}

>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
      <div className="course-main-layout-right-container">

        <CourseLectureSidebar
          modules={modules}
          courseId={courseId}
          currentModuleId={currentModuleId}
          setCurrentModuleId={setCurrentModuleId}
        />

      </div>

    </div>

  );

}