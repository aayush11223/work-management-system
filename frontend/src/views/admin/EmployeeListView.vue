<template>
  <div>
    <PageHeader title="Employees" />
    <EmployeeTable :items="employees" @select="viewEmployee" />
  </div>
</template>

<script>
import EmployeeTable from "@/components/admin/EmployeeTable.vue";
import PageHeader from "@/components/common/PageHeader.vue";
import { store } from "@/store/store.js";

export default {
  name: "EmployeeListView",

  components: {
    EmployeeTable,
    PageHeader,
  },

  data() {
    return {
      loading: true,
    };
  },

  mounted() {
    store.fetchEmployees();
  },

  computed: {
    employees() {
      return store.employees;
    },
  },

  methods: {
    viewEmployee(employee) {
      this.$router.push({
        name: "employee-detail",
        params: { id: employee.id },
      });
    },
  },
};
</script>