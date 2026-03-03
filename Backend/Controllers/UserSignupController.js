import UserSignup from '../Modals/UserSignupModal.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const UserSignupController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // 1️⃣ Check empty fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 2️⃣ Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 3️⃣ Check existing user
    const userExists = await UserSignup.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create user
    const user = await UserSignup.create({
      name,
      email,
      password: hashedPassword
    });

    // 6️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const UserLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserSignup.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};