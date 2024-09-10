<template>
    <div v-if="isVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Edit Customer</h2>
        <form @submit.prevent="submitForm">
          <label for="nombres">Nombres</label>
          <input type="text" v-model="editedCustomer.nombres" />
  
          <label for="apellido_paterno">Apellido Paterno</label>
          <input type="text" v-model="editedCustomer.apellido_paterno" />
  
          <label for="apellido_materno">Apellido Materno</label>
          <input type="text" v-model="editedCustomer.apellido_materno" />
  
          <label for="domicilio">Domicilio</label>
          <input type="text" v-model="editedCustomer.domicilio" />
  
          <label for="correo_electronico">Correo Electrónico</label>
          <input type="email" v-model="editedCustomer.correo_electronico" />
  
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      customer: Object,
      isVisible: Boolean
    },
    data() {
      return {
        editedCustomer: { ...this.customer }
      };
    },
    watch: {
      customer: {
        handler(newCustomer) {
          this.editedCustomer = { ...newCustomer };
        },
        deep: true
      }
    },
    methods: {
      submitForm() {
        this.$emit('save', this.editedCustomer);
        this.closeModal();
      },
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add some basic styles for the modal */
  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-content {
    background-color: navy;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
  }
  
  .close {
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
  </style>
  