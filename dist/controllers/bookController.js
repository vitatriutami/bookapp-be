"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const bookSchema_1 = require("../models/bookSchema");
exports.bookController = {
    getData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const allBooks = yield bookSchema_1.Book.find(CLAUSES); // regex => regular expression
        return res.json(allBooks);
    }),
    getSingleData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const book = yield bookSchema_1.Book.findById(id);
        return res.json(book);
    }),
    // deleteSingleData: async (req: Request, res: Response) => {
    //   const id = req.params;
    //   const bookDeleted = await Book.replaceOne(id)
    //   return res.json(bookDeleted)
    // },
    createData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { name, description, isbn, author } = req.body;
        // file yang akan diterima dari upload.single
        // const file = req.file // save to public folder / object storage
        const createBook = new bookSchema_1.Book({
            name,
            description,
            isbn,
            author,
            file: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname,
            isAvailable: true
        });
        const saved = yield createBook.save();
        return res.json({ message: "Already saved!", data: saved });
    }),
    updateData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params;
        // create logic depends on bookId
        // update to isAvailable ==> false
        const updateBook = yield bookSchema_1.Book.findByIdAndUpdate(id, { isAvailable: false });
        return res.json(updateBook);
    }),
    deleteData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params;
        // create logic depends on bookId
        const deleteBook = yield bookSchema_1.Book.findByIdAndDelete(id);
        return res.json(deleteBook);
    })
};
