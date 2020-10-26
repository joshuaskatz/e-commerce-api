import express from "express";

import * as productsController from "../controllers/products";
import { isAdmin } from "../middleware/isAdmin";
import { isAuth } from "../middleware/isAuth";
import { upload } from "../middleware/upload";

const router: express.Router = express.Router();

router.get("/getProducts", productsController.getProducts);
router.post(
  "/product",
  isAuth,
  isAdmin,
  upload.array("product", 10),
  productsController.createProduct
);

export default router;
