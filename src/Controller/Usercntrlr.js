const User = require("../Models/Users");

exports.Signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message:
            "Email already exists. Please use a different email or Try Login",
        });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.Login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.status(201).json({ user: user, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

exports.Logout = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header("Authorization").replace("Bearer ", "");

    // Remove the specified token from the user's tokens array
    req.user.tokens = req.user.tokens.filter((userToken) => {
      return userToken.token !== token;
    });

    // Save the updated user
    await req.user.save();
    res.status(201).json({
      message: "Logged Out Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};
