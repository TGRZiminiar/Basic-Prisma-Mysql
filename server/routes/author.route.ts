import express from "express"
import { CreateAuthor, DeleteAuthor, GetAllAuthor, GetSingleAuthor } from "../controllers/author.controller";

const router = express.Router();

router.get("/single-author", GetSingleAuthor);
router.get("/authors", GetAllAuthor);

router.post("/create-author", CreateAuthor);
router.delete("/delete-author", DeleteAuthor);



module.exports = router;
