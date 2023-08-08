import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid";

const cartItemSchema = new mongoose.Schema({
  title: {
    shortTitle: String,
    longTitle: String,
  },
  price: {
    mrp: Number,
    cost: Number,
    discount: String,
  },
  id: String,
  url: String,
  detailUrl: String,
  quantity: Number,
  description: String,
  discount: String,
  tagline: String,
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  products: [cartItemSchema],
});


const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
