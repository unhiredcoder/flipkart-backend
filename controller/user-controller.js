import User from '../modal/user-schema.js';

export const userSignup = async (req, res) => {
  try {
    const userData = req.body;
    const exists = await User.findOne({ username: userData.username });

    if (exists) {
      res.status(200).json({ message: "User alredy exists." });
    } else {
      // User does not exist, create a new user
      const user = new User(userData);
      const savedUser = await user.save();
      res.status(200).json({ message: "Signup successful.", user: savedUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};





export const userLogin = async (req, res) => {
  try {
    // Retrieve the email/username and password from the request body
    const { emailOrUsername, password } = req.body;

    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    // Check if the user exists and if the password is correct
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email/username or password" });
    }

    // Return success response
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


