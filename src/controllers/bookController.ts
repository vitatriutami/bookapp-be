import { Request, Response } from "express";
import { Book } from "../models/bookSchema";

export const bookController = {
  getData: async (req: Request, res: Response) => {
    const allBooks = await Book.find();
    return res.json(allBooks);
  },

  getSingleData: async (req: Request, res: Response) => {
    const { id } = req.params;

    const book = await Book.findById(id);
    return res.json(book);
  },

  createData: async (req: Request, res: Response) => {
    const { name, description, isbn, author } = req.body;

    // file yang akan diterima dari upload.single
    // const file = req.file // save to public folder / object storage

    const createBook = new Book({
      name,
      description,
      isbn,
      author,
      file: req.file?.originalname,
    });

    const saved = await createBook.save();

    return res.json({ message: "Already saved!", data: saved });
  },
};
