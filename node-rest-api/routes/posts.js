const router = require("express").Router();
const Post = require("../models/Post");

// Create a Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a Post
// Delete a Post
// Like a Post
// Get a Post
// Get timeline Posts
module.exports = router;
