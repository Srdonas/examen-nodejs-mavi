<template>
    <div>
      <h1>Customer List</h1>
      <ul>
        <li v-for="customer in customers" :key="customer.id">
          <strong>{{ customer.nombres }} {{ customer.apellido_paterno }} {{ customer.apellido_materno }}</strong>
          <br />
          Domicilio: {{ customer.domicilio }}
          <br />
          Correo: {{ customer.correo_electronico }}
          <br />
          <button @click="editCustomer(customer)">Edit</button>
          <button @click="deleteCustomer(customer.id)">Delete</button>
        </li>
      </ul>
      <customer-form @customer-updated="fetchCustomers" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { customerService } from '../services/CustomerService';
  import CustomerForm from './CustomerForm.vue';
  
  export default {
    components: { CustomerForm },
    setup() {
      const customers = ref([]);
  
      const fetchCustomers = async () => {
        customers.value = await customerService.getCustomers();
        console.log(customers.value.data);
      };
  
      const deleteCustomer = async (id) => {
        await customerService.deleteCustomer(id);
        await fetchCustomers();
      };
  
      const editCustomer = (customer) => {
        // Logic to populate the form with customer data for editing
      };
  
      onMounted(fetchCustomers);
  
      return {
        customers,
        fetchCustomers,
        deleteCustomer,
        editCustomer
      };
    },
  };
  </script>  