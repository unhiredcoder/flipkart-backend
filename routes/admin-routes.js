import express from "express";
const dashboardRouter = express.Router();
import {
  addProductToDashboard,
  searchedForProduct,
  getProductsInDashboard,
  deleteProductInDashboard,
  updateProductInDashboard,
  updateUserRole,
  getProductByIdFromDashboard,
  getAllusers,
} from '../controller/admin-controller.js';


dashboardRouter.post("/add-product", addProductToDashboard);
dashboardRouter.get("/products", getProductsInDashboard);
dashboardRouter.delete("/product/:id", deleteProductInDashboard);
dashboardRouter.get("/search/:key", searchedForProduct);
dashboardRouter.put("/product/:id", updateProductInDashboard);
dashboardRouter.get("/product/:id", getProductByIdFromDashboard);
dashboardRouter.get("/users", getAllusers);
dashboardRouter.patch('/api/updateUserRole/:selectedUserId', updateUserRole);


export default dashboardRouter;


