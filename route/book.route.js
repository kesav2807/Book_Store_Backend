import express from 'express';
import { getBooks, getBookById, addBook, updateBook, deleteBook } from '../controller/book.controller.js';

const router = express.Router();

router.get("/", getBooks);         // Get all books
router.get("/:id", getBookById);    // Get a single book by ID
router.post("/", addBook);          // Add a new book
router.put("/:id", updateBook);     // Update book by ID
router.delete("/:id", deleteBook);  // Delete book by ID

export default router;
