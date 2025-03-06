import { Router } from "express";
import { verifyLogin } from "../middlewares/auth.middleware.js";
import { addNote, deleteNote, fetchAllNotes, updateNote } from "../controllers/note.controller.js";

const router = Router();

router.route('/').post(verifyLogin, addNote);
router.route('/').get(verifyLogin, fetchAllNotes);
router.route('/:id').patch(verifyLogin, updateNote);
router.route('/:id').delete(verifyLogin, deleteNote);

export default router;