<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :loading="loading"
    >
      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              color="primary"
              small
              class="mr-2"
              @click="handleRowClick(item)"
            >
              mdi-eye
            </v-icon>
          </template>
          View Details
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "EmployeeTable",
  props: {
    items: {
      type: Array,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    search: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Department", value: "department" },
        { text: "Role", value: "role" },
        { text: "Salary", value: "salary" },
        { text: "Action", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    handleRowClick(employee) {
      this.$emit("select", employee);
    },
  },
};
</script>
