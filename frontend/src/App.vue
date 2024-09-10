<template>
  <div id="app">
    <h1>Customer Management</h1>
    <customer-list />
  </div>
</template>

<script>
import CustomerList from './components/CustomerList.vue';

export default {
  components: {
    CustomerList,
  },
};
</script>

<style>
/* Add any global styles if needed */
</style>
