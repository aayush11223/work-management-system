<template>
  <div>
    <v-data-table
      :headers="computedHeaders"
      :items="items"
      :items-per-page="5"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              color="primary"
              class="mr-2"
              v-bind="attrs"
              v-on="on"
              @click="$emit('edit', item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>Edit Attendance</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>


<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedHeaders() {
      // If showEdit is true, append an actions column configuration
      if (this.showEdit) {
        return [
          ...this.headers,
          { text: "Actions", value: "actions", sortable: false },
        ];
        // used it to safely combine the original table columns with the new 'Actions' column into a brand-new array, preventing us from breaking Vue's rule against modifying read-only props.
      }
      return this.headers;
    },
  },
};
</script>