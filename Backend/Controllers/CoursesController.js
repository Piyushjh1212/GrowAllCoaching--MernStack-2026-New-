import Course from "../Modals/AddCourseModal.js";
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


