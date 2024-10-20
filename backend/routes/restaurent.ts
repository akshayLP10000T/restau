import express from 'express';
import { createRestaurent, getRestaurent, getRestaurentOrders, getSingleRestaurent, searchRestaurent, updateOrderStatus, updateRestaurent } from '../controllers/restaurent';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import upload from '../middlewares/multer'

const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("imageFile"),  createRestaurent);
router.route("/").get(isAuthenticated, getRestaurent);
router.route("/").put(isAuthenticated, upload.single("imageFile"), updateRestaurent);
router.route("/order").get(isAuthenticated, getRestaurentOrders);
router.route("/order/:orderId/status").put(isAuthenticated, updateOrderStatus);
router.route("/search/:searchText").get(isAuthenticated, searchRestaurent);
router.route("/:restaurentId").get(isAuthenticated, getSingleRestaurent);

export default router;