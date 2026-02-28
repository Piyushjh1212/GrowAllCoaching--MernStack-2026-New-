import Course from "../Modals/AddCourseModal.js";
import CourseModule from "../Modals/CourseModuleModal.js";
import Lecture from "../Modals/CourseLectureModals.js";
// Add a new course
export const AddCourse = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;

    // Validate required fields
    if (!title || !description || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new course instance
    const newCourse = new Course({
      title,
      description,
      price,
      image,
      freeLecturesCount: 5 // default value
    });

    // Save to database
    const savedCourse = await newCourse.save();

    // Respond with saved course
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const addModule = async (req, res) => {
  try {
     console.log("Route hit hua ✅");
  console.log("Body:", req.body);
    const { title, Moduleimage, Realprice, courseId } = req.body;

    if (!title || !Moduleimage || !Realprice || !courseId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newmodule = new CourseModule({
      title,
      Moduleimage,
      Realprice: Number(Realprice),
      courseId
    });

    const savedModule = await newmodule.save();

    res.status(201).json(savedModule);
    } catch (error) {
      console.error("Error adding module:", error);
      res.status(500).json({ message: "Server error" });
    }
  }



export const getCourseWithModules = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const modules = await CourseModule.find({ courseId: id });

    res.status(200).json({
      ...course.toObject(),
      modules
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const addLecture = async (req, res) => {
  try {
    const { title, videoUrl, courseId, moduleId, isFree } = req.body;

    // Validation
    if (!title || !videoUrl || !courseId || !moduleId) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Create lecture
    const newLecture = await Lecture.create({
      title,
      videoUrl,
      courseId,
      moduleId,
      isFree: isFree || false
    });

    res.status(201).json({ success: true, lecture: newLecture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCourseWithModulesAndLectures = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Fetch course to check existence
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Fetch modules for this course only
    const modules = await CourseModule.find({ courseId });

    res.status(200).json(modules); // Only modules, no lectures
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};