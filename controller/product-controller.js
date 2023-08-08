import Product from "../modal/product-schema.js";


export const getproducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ products })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getproductById = async (req, res) => {
  try {
    const product = await Product.findOne({ 'id': req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getCartProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ 'id': req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};











