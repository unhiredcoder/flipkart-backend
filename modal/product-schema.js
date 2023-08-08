import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: String,
      unique: true, // Make the `id` field unique
  },
  url: {
    type: String,
  },
  detailUrl: {
    type: String,
  },
  title: {
    shortTitle: {
      type: String,
      },
    longTitle: {
      type: String,
      },
  },
  price: {
    mrp: {
      type: Number,
      },
    cost: {
      type: Number,
      },
    discount: {
      type: String,
    },
  },
  category:{
    type:String,
  },
  quantity: {
    type: Number,
  },
  description: {
    type: String,
  },
  discount: {
    type: String,
  },
  tagline: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
