<template>
  <v-dialog :value="visible" max-width="500px" persistent>
    <v-card>
      <div class="d-flex justify-space-between align-center">
        <v-card-title> Edit Attendance </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn class="text-right" icon @click="closeForm">
            <v-icon color="red">mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </div>

      <v-card-text class="pt-4">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="localRecord.date"
              label="Date"
              readonly
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="localRecord.checkIn"
              label="Check In Time"
              type="time"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="localRecord.checkOut"
              label="Check Out Time"
              type="time"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-select
              v-model="localRecord.status"
              :items="statusOptions"
              label="Status"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="closeForm">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="saveForm">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    record: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      localRecord: {},
      statusOptions: ["Present", "Absent", "Late"],
    };
  },
  watch: {
    // Clone prop data when form opens to avoid direct mutations
    visible(newVal) {
      if (newVal && this.record) {
        this.localRecord = { ...this.record };
      }
    },
  },
  methods: {
    closeForm() {
      this.$emit("close");
    },
    saveForm() {
      this.$emit("save", this.localRecord);
    },
  },
};
</script>