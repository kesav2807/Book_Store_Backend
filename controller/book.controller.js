import Book from "../model/book.model.js";

// Get all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a single book by ID
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });

        res.status(200).json(book);
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Add a new book
export const addBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update book by ID
export const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedBook) return res.status(404).json({ message: "Book not found" });

        res.status(200).json(updatedBook);
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete book by ID
export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) return res.status(404).json({ message: "Book not found" });

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
