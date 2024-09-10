<template>
    <div>
      <h1>Customer List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Domicilio</th>
            <th>Correo Electrónico</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{ customer.id }}</td>
            <td>{{ customer.nombres }}</td>
            <td>{{ customer.apellido_paterno }}</td>
            <td>{{ customer.apellido_materno }}</td>
            <td>{{ customer.domicilio }}</td>
            <td>{{ customer.correo_electronico }}</td>
            <td>
              <button @click="openEditModal(customer)">Edit</button>
              <button @click="deleteCustomer(customer.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Customer modal -->
      <customer-modal
        :customer="selectedCustomer"
        :isVisible="isModalVisible"
        @save="saveCustomer"
        @close="closeModal"
      />
  
      <customer-form @customer-updated="fetchCustomers" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { customerService } from '../services/CustomerService';
  import CustomerForm from './CustomerForm.vue';
  import CustomerModal from './CustomerModal.vue';
  
  export default {
    components: { CustomerForm, CustomerModal },
    setup() {
      const customers = ref([]);
      const selectedCustomer = ref(null);
      const isModalVisible = ref(false);
  
      const fetchCustomers = async () => {
        try {
          const response = await customerService.getCustomers();
          customers.value = response.data;
        } catch (error) {
          console.error('Error fetching customers:', error);
        }
      };
  
      const deleteCustomer = async (id) => {
        try {
          await customerService.deleteCustomer(id);
          await fetchCustomers();
        } catch (error) {
          console.error('Error deleting customer:', error);
        }
      };
  
      const openEditModal = (customer) => {
        selectedCustomer.value = customer;
        isModalVisible.value = true;
      };
  
      const closeModal = () => {
        isModalVisible.value = false;
        selectedCustomer.value = null;
      };
  
      const saveCustomer = async (updatedCustomer) => {
        try {
          await customerService.updateCustomer(updatedCustomer.id, updatedCustomer);
          await fetchCustomers();
          closeModal();
        } catch (error) {
          console.error('Error updating customer:', error);
        }
      };
  
      onMounted(fetchCustomers);
  
      return {
        customers,
        selectedCustomer,
        isModalVisible,
        fetchCustomers,
        deleteCustomer,
        openEditModal,
        closeModal,
        saveCustomer,
      };
    },
  };
  </script>
  