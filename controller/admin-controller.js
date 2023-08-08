import Product from "../modal/product-schema.js"
import User from "../modal/user-schema.js";
import crypto from 'crypto'
export async function getAllusers(req, res) {
  try {
    let users = await User.find({}); // Assuming User.find() returns an array of users
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch users from the DB" });
    console.log(error);
  }
}


function generateHashPassword() {
  const currentMinute = new Date().getMinutes().toString();
  const hash = crypto.createHash('sha256').update(currentMinute).digest('hex');
  const numericPassword = hash.replace(/\D/g, '').substring(0, 6);
  return numericPassword;
}

export async function updateUserRole(req, res) {
  const { selectedUserId } = req.params;
  const { password, newRole } = req.body;
  const hashedPassword = generateHashPassword();

  // Check if the provided password matches the superadmin password
  if (password === hashedPassword) {
    // Get the user's current role
    const user = await User.findById(selectedUserId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the user has the "superadmin" role
    if (user.role === 'superadmin') {
      return res.status(403).json({ message: 'Changing role for superadmin is not allowed.' });
    }

    // Update the user's role if they don't have the "superadmin" role
    const updatedUser = await User.findByIdAndUpdate(selectedUserId, { role: newRole }, { new: true });

    return res.status(200).json({ message: 'User role updated successfully.' });
  } else {
    return res.status(401).json({ message: 'Incorrect superadmin password.' });
  }
}



// // Add a product to the dashboard
export async function addProductToDashboard(req, res) {
  try {
    // Assuming the frontend sends the product data in the request body
    const newProduct = req.body;

    // Create a new instance of the Product model with the newProduct data
    const product = new Product(newProduct);

    // Save the new product to the database
    const result = await product.save();

    res.status(201).json({ message: 'Product added successfully', product: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add product' });
  }
}

// Get all products in the dashboard
export async function getProductsInDashboard(req, res) {
  try {
    let products = await Product.find();
    if (products.length > 0) {
      res.send(products);
    } else {
      res.send({ result: "No Products found in the dashboard" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch products from the dashboard" });
  }
}





// Delete a product from the dashboard
export async function deleteProductInDashboard(req, res) {
  try {
    let products = await Product.deleteOne({ id: req.params.id });
    res.send(products);
  } catch (error) {
    res.status(500).send({ error: "Failed to delete product from the dashboard" });
  }
}






// Update a product in the dashboard
export async function updateProductInDashboard(req, res) {
  try {
    let newlyupdate = await Product.updateOne({ id: req.params.id }, { $set: req.body });
    res.send(newlyupdate);
  } catch (error) {
    res.status(500).send({ error: "Failed to update product in the dashboard" });
  }
}


// Get a specific product by ID from the dashboard
export async function getProductByIdFromDashboard(req, res) {
  try {
    let result = await Product.findOne({ id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.status(404).send("Product not found in the dashboard");
    }
  } catch (error) {
    console.error("Error fetching product from dashboard:", error);
    res.status(500).send("Internal server error or no product found in the dashboard");
  }
}


export async function searchedForProduct(req, res) {
  try {
    const escapedKeyword = req.params.key.replace(/[$]/g, '\\$');
    const result = await Product.find({
      $or: [
        { 'title.shortTitle': { $regex: escapedKeyword, $options: 'i' } },
      ],
    });
    res.send(result);
  } catch (error) {
    res.status(500).send('An error occurred');
  }
}

