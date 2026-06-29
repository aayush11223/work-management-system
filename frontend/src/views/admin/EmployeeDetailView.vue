<template>
  <v-card v-if="employee.id">
    <EmployeeDetailTabs :employee="employee" />
    <v-row class="ml-1 mt-1">
      <v-col cols="12" md="6">
        <p>ID: {{ employee.id }}</p>
        <p>Name: {{ employee.name }}</p>
        <p>Email: {{ employee.email }}</p>
        <p>Department: {{ employee.department }}</p>
      </v-col>
      <v-col cols="12" md="6">
        <p>Role: {{ employee.role }}</p>
        <p>Phone: {{ employee.phone }}</p>
        <p>Salary: {{ employee.salary }}</p>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import EmployeeDetailTabs from "@/components/admin/EmployeeDetailTabs.vue";
import { store } from "@/store/store.js";

export default {
  name: "EmployeeDetailView",
  components: { EmployeeDetailTabs },

  computed: {
    employee() {
      const id = parseInt(this.$route.params.id);
      return store.employees.find((employee) => employee.id === id);
    },
  },

  mounted() {
    store.fetchEmployees();
  },
};
</script>