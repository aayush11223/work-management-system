<template>
  <v-dialog
    :value="visible"
    @input="$emit('update:visible', $event)"
    max-width="600px"
    persistent
  >
    <v-card>
      <div class="d-flex justify-space-between align-center">
        <v-card-title> Request Leave </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="text-right" icon @click="$emit('close')">
            <v-icon color="red">mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </div>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-select
            v-model="form.leaveType"
            :items="leaveTypes"
            label="Leave Type"
            :rules="[(v) => !!v || 'Leave type is required']"
            required
          ></v-select>

          <v-text-field
            v-model="form.fromDate"
            label="From Date"
            type="date"
            :rules="[(v) => !!v || 'From date is required']"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.toDate"
            label="To Date"
            type="date"
            :rules="[
              (v) => !!v || 'To date is required',
              (v) =>
                !form.fromDate ||
                v >= form.fromDate ||
                'To date must be after From date',
            ]"
            required
          ></v-text-field>

          <v-textarea
            v-model="form.reason"
            label="Reason"
            :rules="[(v) => !!v || 'Reason for leave is required']"
            required
          ></v-textarea>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LeaveRequestForm",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: false,
      leaveTypes: ["Sick Leave", "Annual Leave", "Emergency Leave"],
      form: {
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: "",
      },
    };
  },
  methods: {
    close() {
      this.$refs.form.reset();
      this.$emit("close");
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit("submit", { ...this.form });
        // creates a fresh, shallow copy of the form data, and does not affect original form
        this.$refs.form.reset();
        this.$emit("close");
      }
    },
  },
};
</script>

<style scoped>
</style>