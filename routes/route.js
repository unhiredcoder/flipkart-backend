import { userSignup, userLogin } from "../controller/user-controller.js";
import { getproducts, getproductById,getCartProduct } from "../controller/product-controller.js";
import { getCartFromDb,  saveCartToDb } from "../controller/cart-controller.js";
import { checkout } from "./stripe.js";
import express from "express";
const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/products", getproducts);
router.get(`/product/detail/:id`, getproductById);
router.get(`/cart/:id`, getCartProduct);
router.post(`/api/savecart/:userId`, saveCartToDb);
router.get(`/api/getcart/:userId`, getCartFromDb);
router.post(`/create-checkout-session`, checkout);

export default router;
