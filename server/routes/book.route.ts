import express from "express"
import { CreateAuthor, DeleteAuthor, GetAllAuthor, GetSingleAuthor } from "../controllers/author.controller";
import { CreateBook, DeleteBook, GetAllBook, GetSingleBook } from "../controllers/book.controller";

const router = express.Router();

router.get("/single-book", GetSingleBook);
router.get("/books", GetAllBook);

router.post("/create-book", CreateBook);
router.delete("/delete-book", DeleteBook);


module.exports = router;
