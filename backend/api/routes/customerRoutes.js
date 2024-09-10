// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// POST - Create a new customer
router.post('/customers', customerController.createCustomer);

// GET - Get all customers
router.get('/customers', customerController.getCustomers);

// GET - Get a single customer by ID
router.get('/customers/:id', customerController.getCustomerById);

// PUT - Update a customer by ID
router.put('/customers/:id', customerController.updateCustomer);

// DELETE - Delete a customer by ID
router.delete('/customers/:id', customerController.deleteCustomer);

module.exports = router;
