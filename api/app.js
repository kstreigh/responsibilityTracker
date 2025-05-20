const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const homeRouter = require('./routes/home.js');
const calendarRouter = require('./routes/calendar.js');
const countdownRouter = require('./routes/countdown.js');
const cors = require('cors');
app.use(express.json()); // Built-in body parser
app.use(cors());
const MONGODB_URI = 'mongodb://localhost:27017/calendardb';
app.use('/', homeRouter); 
app.use('/calendar', calendarRouter);
app.use('/countdown', countdownRouter);

  mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server only after successful DB connection
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err.message);
  });