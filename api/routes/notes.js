const express = require('express');
const router = express.Router();
const Note = require('../model/notes');

// Test route
/* 
router.get('/', (req, res) => {
    res.json(notes);
  });
router.get('/:id', (req, res) => {
    const note = notes.find(n => n.id === req.params.id)
    if (!note){
        return res.status(404).send('Note not found');
    }
    res.json(note)
  });
router.post('/', (req, res) => {
    const { id, title, content } = req.body;
    if (!id || !title || !content) {
        return res.status(400).send('Missing info');
    }
    const newNote = {id, title, content};
    notes.push(newNote);
    res.status(201).json(newNote);
  });
router.put('/:id', (req, res) => {
    const { id, title, content } = req.body;
    const index = notes.findIndex(n => n.id === req.params.id);
    if (index === -1){
        return res.status(404).send('Note not found');
    }
    notes[index] = {id: req.params.id, title, content }
  });
router.delete('/:id', (req, res) => {
    const index = notes.findIndex(n => n.id === req.params.id);
    if (index === -1){
        return res.status(404).send('Note not found');
    }
    notes.splice(index, 1);
    res.status(204).send()
  });
  */
  router.get('/', async (req, res) => {
    try {
      const notes = await Note.find();
      res.json(notes);
    } catch (err){
      res.status(500).json({error: err.message });
    }
  });
  router.get('/:id', async (req, res) => {
    try{
      const note = await Note.findById(req.params.id);
      if (!note) return res.status(404).json({error: 'Note not found'});
      res.json(note);
    } catch (err) {
      res.status(400).json({error: 'Invalid ID'});
    }
  });
  router.post('/', async (req, res) => {
    try{
      const { id, title, content } = req.body;
      const newNote = new Note({title, content});
      await newNote.save();
    res.status(201).json(newNote);
  } catch (err){
    res.status(400).json({error:err.message});
  }
  });
  router.put('/:id', async (req, res) => {
    try {
      const { title, content } = req.body;
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id, 
        {title, content},
        { new:true, runValidators:true }
      );
      if (!updatedNote) return res.status(404).json({error: 'Note not found'});
      res.json(updatedNote);
    } catch (err){
      res.status(400).json({error: err.message});
    }
    
  });
  router.delete('/:id', async (req, res) => {
    try {
      const deletedNote = await Note.findByIdAndDelete(req.params.id);
      if (!deletedNote) return res.status(404).json({ error: 'Note not found'});
      res.status(204).send();
    } catch (err){
      res.status(400).json({error: err.message});
    }
  });
module.exports = router;