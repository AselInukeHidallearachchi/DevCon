const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth"); // Custom middleware for authentication
// models file is named `Posts.js` in the project, require the correct path
const Post = require("../../models/Posts");
const User = require("../../models/User");

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [
    auth, // Check if the user is authenticated
    check("text", "Text is required").not().isEmpty(), // Validate the text field
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Get the user from the token
      const user = await User.findById(req.user.id).select("-password");

      // Create a new post
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      // Save the post
      const post = await newPost.save();

      // Return the created post
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
