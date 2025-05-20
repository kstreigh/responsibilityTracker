const express = require('express');
const router = express.Router();

// GET /
router.get('/', async (req, res) => {
  try {
    res.status(200).send('Welcome to the Home Page!');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
 