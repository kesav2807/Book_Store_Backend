import bcryptjs from "bcryptjs";
import User from "../model/user.model.js";

// User Registration (Signup)
export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password before saving
        const hashPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({
            fullname,
            email,
            password: hashPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// User Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare provided password with hashed password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Fetch All Users (Excluding Passwords)
export const getUser = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude passwords from response
        res.status(200).json(users);
    } catch (error) {
        console.error("Get Users Error:", error.message);
        res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
};
