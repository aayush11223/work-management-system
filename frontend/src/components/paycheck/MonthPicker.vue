<template>
  <v-row>
    <v-col cols="6">
      <v-select
        v-model="selectedMonth"
        :items="months"
        label="Month"
        item-text="name"
        item-value="value"
        outlined
        @change="emitChange"
      />
    </v-col>

    <v-col cols="6">
      <v-select
        v-model="selectedYear"
        :items="years"
        label="Year"
        outlined
        @change="emitChange"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
    },
  },

  data() {
    const currentYear = new Date().getFullYear();

    return {
      selectedMonth: this.value.month,
      selectedYear: this.value.year,

      months: [
        { name: "January", value: 1 },
        { name: "February", value: 2 },
        { name: "March", value: 3 },
        { name: "April", value: 4 },
        { name: "May", value: 5 },
        { name: "June", value: 6 },
        { name: "July", value: 7 },
        { name: "August", value: 8 },
        { name: "September", value: 9 },
        { name: "October", value: 10 },
        { name: "November", value: 11 },
        { name: "December", value: 12 },
      ],

      years: [currentYear, currentYear - 1, currentYear - 2],
    };
  },

  methods: {
    emitChange() {
      this.$emit("change", {
        month: this.selectedMonth,
        year: this.selectedYear,
      });
    },
  },
};
</script>