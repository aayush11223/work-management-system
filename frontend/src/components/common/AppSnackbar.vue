<template>
  <v-snackbar
    v-model="show"
    :color="snackbarColor"
    :timeout="3000"
    top
    centered
  >
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="$emit('close')"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    message: { type: String },
    type: { type: String, default: "info" },
    visible: { type: Boolean, default: false },
  },
  computed: {
    // property to handle reading and writing safely
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
    snackbarColor() {
      const colors = { success: "green", error: "red", info: "blue" };
      return colors[this.type];
    },
  },
};
</script>