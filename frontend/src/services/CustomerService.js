// src/services/CustomerService.js
class CustomerService {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/customers';
  }

  async getCustomers() {
    const response = await fetch(this.baseUrl);
    return await response.json();
  }

  async createCustomer(data) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  async updateCustomer(id, data) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  async deleteCustomer(id) {
    await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
  }
}

export const customerService = new CustomerService();
