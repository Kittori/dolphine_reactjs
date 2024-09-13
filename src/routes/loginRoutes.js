const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require('../models/Account');

router.post('/', async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    // Find the user by email or username
    const account = await Account.findOne({ 
      $or: [{ email: emailOrUsername }, { name: emailOrUsername }] 
    });

    if (!account) {
      return res.status(400).json({ message: 'Invalid email/username' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, account.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: account._id }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log("Success!")

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
