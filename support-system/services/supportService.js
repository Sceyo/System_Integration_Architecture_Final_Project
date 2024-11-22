const Ticket = require('../models/Ticket');

// Create a new ticket
const createTicket = async (data) => {
    const ticket = new Ticket(data);
    return await ticket.save();
};

// Get all tickets
const getTickets = async () => {
    return await Ticket.find().populate('customerId', 'name email');
};

// Get a ticket by ID
const getTicketById = async (id) => {
    return await Ticket.findById(id).populate('customerId', 'name email');
};

// Update ticket status
const updateTicketStatus = async (id, status) => {
    return await Ticket.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
    );
};

module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicketStatus,
};
