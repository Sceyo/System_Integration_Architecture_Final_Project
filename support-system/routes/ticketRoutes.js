const express = require('express');
const router = express.Router();
const {
    createTicket,
    getTickets,
    getTicketById,
    updateTicketStatus,
} = require('../services/supportService');

// Create a new ticket
router.post('/', async (req, res) => {
    try {
        const ticket = await createTicket(req.body);
        res.status(201).json(ticket);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to create ticket' });
    }
});

// Get all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await getTickets();
        res.json(tickets);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
});

// Get a ticket by ID
router.get('/:id', async (req, res) => {
    try {
        const ticket = await getTicketById(req.params.id);
        if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
        res.json(ticket);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch ticket' });
    }
});

// Update ticket status
router.put('/:id/status', async (req, res) => {
    try {
        const updatedTicket = await updateTicketStatus(req.params.id, req.body.status);
        if (!updatedTicket) return res.status(404).json({ error: 'Ticket not found' });
        res.json(updatedTicket);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error
