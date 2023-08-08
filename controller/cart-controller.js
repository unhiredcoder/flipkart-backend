import Cart from "../modal/cart-schema.js";

export const saveCartToDb = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartData = req.body;

    // Find the cart data for the given user ID
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If cart data does not exist for the user, create a new cart instance
      cart = new Cart({ userId, products:cartData });
    } else {
      // If cart exists, update the cartData with the new data
      cart.products = cartData;
    }

    // Save the cart to the database
    await cart.save();

    res.status(200).json({ message: "Cart data saved successfully", cartData });
  } catch (error) {
    console.error("Error saving cart data to the database:", error.message);
    res.status(500).json({ error: "Failed to save cart data to the database" });
  }
};



export const getCartFromDb = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartData = await Cart.findOne({ userId });

    if (!cartData) {
      // Handle the case where cart data is not found for the user
      return res.status(404).json({ error: 'Cart data not found' });
    }

    // Return the "products" array from the cartData document
    res.json(cartData.products);
  } catch (error) {
    console.error('Error fetching cart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

