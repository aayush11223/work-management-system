<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    class="elevation-1"
    @click:row="handleRowClick"
  >
    <!-- Status Slot -->
    <template v-slot:[`item.status`]="{ item }">
      <LeaveStatusChip :status="item.status" />
    </template>

    <!-- Actions Slot -->
    <template v-slot:[`item.actions`]="{ item }">
      <div v-if="item.status === 'pending'">
        <v-btn
          depressed
          x-small
          color="success"
          class="mr-2"
          @click.stop="$emit('approve', item)"
        >
          Approve
        </v-btn>
        <v-btn
          depressed
          x-small
          color="error"
          @click.stop="$emit('reject', item)"
        >
          Reject
        </v-btn>
      </div>

      <div v-else>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              color="primary"
              small
              class="mr-2"
              @click="$emit('edit', item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>Edit Leave</span>
        </v-tooltip>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import LeaveStatusChip from "./LeaveStatusChip.vue";

export default {
  name: "LeaveRequestTable",
  components: {
    LeaveStatusChip,
  },
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showActions: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
