<template>
  <v-data-table
    :headers="headers"
    :items="customers"
    :sort-by="[{ key: 'id', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Clientes Manager</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <!-- Message when customers are available -->
        <v-alert v-if="customers.length === 0" type="info" dismissible>
          Hay {{ customers.length }} cliente(s) en la lista.
        </v-alert>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              Nuevo Cliente
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="isValid" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.nombres"
                        :rules="[requiredRule, lettersOnlyRule]"
                        label="Nombres"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.apellido_paterno"
                        :rules="[requiredRule, lettersOnlyRule]"
                        label="Apellido Paterno"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.apellido_materno"
                        :rules="[requiredRule, lettersOnlyRule]"
                        label="Apellido Materno"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.domicilio"
                        :rules="[requiredRule]"
                        label="Domicilio"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.correo_electronico"
                        :rules="[requiredRule, emailRules]"
                        required
                        label="Correo Electrónico"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="text" :disabled="!isValid" @click="save">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card>
            <v-card-title class="text-h5">¿Estas seguro de que quieres eliminar este usuario?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteCustomerConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editCustomer(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteCustomer(item)">
        mdi-delete
      </v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="fetchCustomers">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { ref, onMounted } from 'vue';
import { customerService } from '../services/apiService';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    isValid: false, // Tracks form validity
    headers: [
      { title: 'ID', key: 'id' },
      { title: 'Nombres', key: 'nombres' },
      { title: 'Apellido Paterno', key: 'apellido_paterno' },
      { title: 'Apellido Materno', key: 'apellido_materno' },
      { title: 'Domicilio', key: 'domicilio' },
      { title: 'Correo Electrónico', key: 'correo_electronico' },
      { title: 'Acciones', key: 'actions', sortable: false },
    ],
    customers: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      nombres: '',
      apellido_paterno: '',
      apellido_materno: '',
      domicilio: '',
      correo_electronico: '',
    },
    defaultItem: {
      id: '',
      nombres: '',
      apellido_paterno: '',
      apellido_materno: '',
      domicilio: '',
      correo_electronico: '',
    },
    // Validation rules
    requiredRule: v => !!v || 'Este campo es obligatorio',
    lettersOnlyRule: v => /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/i.test(v) || 'Este campo solo debe contener letras',
    emailRules: v => !!v && /.+@.+\..+/.test(v) || 'Correo electrónico no válido',
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Cliente' : 'Editar Cliente';
    },
  },

  watch: {
    dialog(val) {
      if (!val) this.close();
    },
    dialogDelete(val) {
      if (!val) this.closeDelete();
    },
  },

  mounted() {
    this.fetchCustomers();
  },

  methods: {
    async fetchCustomers() {
      try {
        const response = await customerService.getCustomers();
        this.customers = response.data;
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    },

    editCustomer(item) {
      this.editedIndex = this.customers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteCustomer(item) {
      this.editedIndex = this.customers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteCustomerConfirm() {
      this.customers.splice(this.editedIndex, 1);
      await customerService.deleteCustomer(this.editedItem.id);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        // Update customer
        Object.assign(this.customers[this.editedIndex], this.editedItem);
        await customerService.updateCustomer(this.editedItem.id, this.editedItem);
      } else {
        // Add new customer
        const newCustomer = await customerService.createCustomer(this.editedItem);
        this.customers.push(newCustomer.data);
      }
      this.close();
    },
  },
};
</script>
