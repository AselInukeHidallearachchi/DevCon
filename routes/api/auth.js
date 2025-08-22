const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

/**
 * @route   GET api/auth
 * @desc    Get logged-in user data
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  try {
    // Find user by ID from the decoded token
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    res.json(user); // Return user data
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
