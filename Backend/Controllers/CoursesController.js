import CoursesProducts from "../Modals/CoursesModal.js";

export const getCoursesProducts = async (req, res) => {
    try {
        const { title, description, image } = req.body;

        // Validate required fields
        if (!title || !description || !image) {
            return res.status(400).json({ message: "Title, description, and image are required" });
        }

        const existing = await CoursesProducts.findOne({ title });
        if (existing) {
            return res.status(400).json({ message: "Course with this title already exists." });

        }

        const newEntry = new CoursesProducts({
            title,
            description,
            image,
        });

        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);


    } catch (err) {

        res.status(500).json({ message: err.message });

    }
}


export const getAllCourses = async (req, res) => {
  try {
    const courses = await CoursesProducts.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};