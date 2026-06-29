<template>
  <v-dialog :value="visible" persistent max-width="600px">
    <v-card>
      <div class="d-flex justify-space-between align-center">
        <v-card-title> Log Work </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="text-right" icon @click="$emit('close')">
            <v-icon color="red">mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="form.date"
            label="Date"
            type="date"
            :rules="[(v) => !!v || 'Date is required']"
          ></v-text-field>

          <v-textarea
            v-model="form.description"
            label="Description"
            :rules="[
              (v) => !!v || 'Description is required',
              (v) =>
                (v && v.length >= 5) ||
                'Description must be at least 5 characters',
            ]"
          ></v-textarea>

          <v-text-field
            v-model.number="form.units"
            label="Units"
            type="number"
            :rules="[
              (v) => !!v || 'Units are required',
              (v) => v > 0 || 'Units must be a positive integer',
            ]"
          ></v-text-field>

          <v-text-field
            v-model.number="form.hours"
            label="Hours"
            type="number"
            :rules="[
              (v) => !!v || 'Hours are required',
              (v) =>
                (v > 0 && v <= 24) || 'Hours must be greater than 0 and max 24',
            ]"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="handleCancel">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="handleSubmit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "WorkLogForm",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      valid: false,
      form: {
        date: "",
        description: "",
        units: null,
        hours: null,
      },
    };
  },
  methods: {
    handleCancel() {
      this.resetForm();
      this.$emit("close");
    },
    handleSubmit() {
      if (this.$refs.form.validate()) {
        this.$emit("submit", { ...this.form });
        this.resetForm();
      }
    },
    resetForm() {
      this.$refs.form.reset();
      this.form = {
        date: "",
        description: "",
        units: null,
        hours: null,
      };
    },
  },
};
</script>
