import MyCoursesProduct from "../Modals/CourseProductModel.js";
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
    const courses = await MyCoursesProduct.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// yhna pe course ke details ke liye ek function likhna hai jo course ke id se uske details ko fetch karega.

// POST new product

export const AddCourseProduct  = async (req, res) => {
  try {
    const { name, description, image, price } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    // Optional: Check if product with same name exists
    const existing = await MyCoursesProduct.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Product with this name already exists." });
    }

    // Create new product
    const newProduct = new MyCoursesProduct({
      name,
      description,
      image,
      price
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getCourseWithProducts = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Course ID is required" });

    // Find course and populate products safely
    const course = await CoursesProducts.findById(id).populate("products");

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json(course);
  } catch (err) {
    console.error("Error in getCourseWithProducts:", err);
    res.status(500).json({ message: err.message });
  }
};