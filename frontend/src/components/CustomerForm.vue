<template>
    <div>
      <h2>Add Customer</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="form.nombres" placeholder="Nombres" required />
        <input v-model="form.apellido_paterno" placeholder="Apellido Paterno" required />
        <input v-model="form.apellido_materno" placeholder="Apellido Materno" required />
        <input v-model="form.domicilio" placeholder="Domicilio" required />
        <input v-model="form.correo_electronico" type="email" placeholder="Correo Electrónico" required />
        <button type="submit">{{ isEdit ? 'Update' : 'Add' }} Customer</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { customerService } from '../services/CustomerService';
  
  export default {
    emits: ['customer-updated'],
    setup(_, { emit }) {
      const form = ref({
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
        domicilio: '',
        correo_electronico: '',
      });
      const isEdit = ref(false);
  
      const handleSubmit = async () => {
        if (isEdit.value) {
          await customerService.updateCustomer(form.value.id, form.value);
        } else {
          await customerService.createCustomer(form.value);
        }
  
        emit('customer-updated');
        form.value = {
          nombres: '',
          apellido_paterno: '',
          apellido_materno: '',
          domicilio: '',
          correo_electronico: '',
        };
      };
  
      return {
        form,
        isEdit,
        handleSubmit
      };
    },
  };
  </script>
  