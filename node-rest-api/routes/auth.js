const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

// Register
router.post('/register',async (req, res) => {
  try {
    // Generate hash of password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser =await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save user and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch(err) {
    res.status(500).json(err);
  }
})

// Login
router.post('/login', async(req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json('User not found');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    !validPassword && res.status(400).json("Invalid Credentials")
    res.status(200).json({user})
  } catch(err) {
    res.status(500).json(err);
  }
})


module.exports = router;