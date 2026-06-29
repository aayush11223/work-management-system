<template>
  <v-dialog :value="visible" persistent width="320">
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="blue darken-1" @click="$emit('cancel')">
          Cancel
        </v-btn>
        <v-btn color="red darken-1" text @click="$emit('confirm')">
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String },
    message: { type: String },
  },
};
</script>