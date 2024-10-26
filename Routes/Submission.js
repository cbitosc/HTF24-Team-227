const express = require('express');
const mongoose = require('mongoose');
const Submission = require('../models/submission'); // assuming you have a submission model
const router = express.Router();


router.post('/submission', async (req, res) => {
    try {
        const newSubmission = new Submission(req.body);
        await newSubmission.save();
        res.status(201).json(newSubmission);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get('/submission', async (req, res) => {
    try {
        const submissions = await Submission.find().populate('assignment student course');
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/submission/:id', async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id).populate('assignment student course');
        if (!submission) return res.status(404).json({ message: 'Submission not found' });
        res.json(submission);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put('/submission/:id', async (req, res) => {
    try {
        const submission = await Submission.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!submission) return res.status(404).json({ message: 'Submission not found' });
        res.json(submission);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete('/submission/:id', async (req, res) => {
    try {
        const submission = await Submission.findByIdAndDelete(req.params.id);
        if (!submission) return res.status(404).json({ message: 'Submission not found' });
        res.json({ message: 'Submission deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
