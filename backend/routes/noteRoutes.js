import express from "express";
import {
createNote,
getNotes,
updateNote,
deleteNote,
searchNotes
} from "../controllers/noteController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

router.get("/search", protect, searchNotes);

export default router;