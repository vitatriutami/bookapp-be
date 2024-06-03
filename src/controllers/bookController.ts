import { Request, Response } from "express";
import { Book } from "../models/bookSchema";

export const bookController = {
  getData: async (req: Request, res: Response) => {
    const { search } = req.query; // to query

    const CLAUSES = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const allBooks = await Book.find(CLAUSES); // regex => regular expression
    return res.json(allBooks);
  },

  getSingleData: async (req: Request, res: Response) => {
    const { id } = req.params;

    const book = await Book.findById(id);
    return res.json(book);
  },

  // deleteSingleData: async (req: Request, res: Response) => {
  //   const id = req.params;

  //   const bookDeleted = await Book.replaceOne(id)
  //   return res.json(bookDeleted)
  // },

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
      isAvailable: true
    });

    const saved = await createBook.save();

    return res.json({ message: "Already saved!", data: saved });
  },

  updateData: async (req: Request, res: Response) => {
    const id = req.params
  
    // create logic depends on bookId
    // update to isAvailable ==> false
    const updateBook = await Book.findByIdAndUpdate(id, {isAvailable: false})
    return res.json(updateBook)
  },
  deleteData: async (req: Request, res: Response) => {
    const id = req.params
  
    // create logic depends on bookId
    const deleteBook = await Book.findByIdAndDelete(id)
    return res.json(deleteBook)
  }
};
