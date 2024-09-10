// controllers/customerController.js
const Customer = require('../models/customer');

// Create new customer (POST)
exports.createCustomer = async (req, res) => {
  try {
    const { nombres, apellido_paterno, apellido_materno, domicilio, correo_electronico } = req.body;

    // Ensure that the request body is in JSON format
    if (!nombres || !apellido_paterno || !apellido_materno || !domicilio || !correo_electronico) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newCustomer = await Customer.create({
      nombres,
      apellido_paterno,
      apellido_materno,
      domicilio,
      correo_electronico,
    });

    // Output the newly created customer in JSON format
    return res.status(201).json({ message: 'Customer created successfully', data: newCustomer });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating customer', error });
  }
};

// Get all customers (GET)
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    return res.status(200).json({ data: customers });  // Return as JSON
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching customers', error });
  }
};

// Get a single customer by ID (GET)
exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    return res.status(200).json({ data: customer });  // Return customer as JSON
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching customer', error });
  }
};

// Update a customer by ID (PUT)
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellido_paterno, apellido_materno, domicilio, correo_electronico } = req.body;

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Update customer data with new values
    customer.nombres = nombres;
    customer.apellido_paterno = apellido_paterno;
    customer.apellido_materno = apellido_materno;
    customer.domicilio = domicilio;
    customer.correo_electronico = correo_electronico;

    await customer.save();

    return res.status(200).json({ message: 'Customer updated successfully', data: customer });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating customer', error });
  }
};

// Delete a customer by ID (DELETE)
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.destroy();
    return res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting customer', error });
  }
};
