const express = require('express');
const CalendarDate = require('../model/calendarDate');
const router = express.Router();

// GET /
router.get('/', async (req, res) => {
  try {
    res.status(200).send('Welcome to the Home Page!');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

router.post('/api/save-option', async (req, res) => {
  console.log('Body received:', req.body);
  const { date, titleText, contentText, selectedOption } = req.body;

  try{
    const newCalendarDate = new CalendarDate({
      Date: date,
      Title: titleText, 
      Content: contentText, 
      Occurence: selectedOption
    })

    await newCalendarDate.save();
    res.status(201).json({ message: 'Entry saved successfully' });

  } catch (err){
    console.error('Save failed:', err);
    res.status(500).json({ message: 'Server error saving entry' });
  }});

  router.get('/api/calendar', async (req, res) => {
    try {
      const entries = await CalendarDate.find();
      res.status(200).json(entries);
    } catch (err){
      res.status(500).json({ message: 'Server error fetching entries' });
    }
  });



module.exports = router;