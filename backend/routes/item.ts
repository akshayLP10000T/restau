import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import upload from '../middlewares/multer'
import { addItem, editItem } from '../controllers/item';

const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("image"), addItem);
router.route("/:id").put(isAuthenticated, upload.single("image"), editItem);

export default router;