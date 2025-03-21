import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI ||"mongodb+srv://ezhilrupa3:ezhilrupa3@cluster0.tohur.mongodb.net/Rupa_Book_Store" ;

// MongoDB connection
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  pincode: { type: String, required: true },
  locality: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  landmark: { type: String },
  altPhone: { type: String },
  addressType: { type: String, enum: ["Home", "Work", "Other"], required: true },
  
});

const Order = mongoose.model("Order", OrderSchema);

// Defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// API Route to handle checkout submission
app.post("/checkout", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
});

// **Get Order List (GET)**
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
  