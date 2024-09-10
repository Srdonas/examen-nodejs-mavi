import axios from 'axios';

class CustomerService {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/customers';
  }

  // Get all customers
  async getCustomers() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data; // Axios automatically parses the JSON response
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }

  // Create a new customer
  async createCustomer(data) {
    try {
      const response = await axios.post(this.baseUrl, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  // Update an existing customer by ID
  async updateCustomer(id, data) {
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  }

  // Delete a customer by ID
  async deleteCustomer(id) {
    try {
      await axios.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }
}

export const customerService = new CustomerService();

