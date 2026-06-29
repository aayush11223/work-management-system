<template>
  <div>
    <PageHeader :title="title" />

    <MonthPicker
      class="mt-3"
      :value="{
        month: selectedMonth,
        year: selectedYear,
      }"
      @change="handleMonthChange"
    />

    <PaycheckSummaryCard :summary="summary" />
  </div>
</template>

<script>
import { store } from "@/store/store.js";
import PageHeader from "@/components/common/PageHeader.vue";
import MonthPicker from "@/components/paycheck/MonthPicker.vue";
import PaycheckSummaryCard from "@/components/paycheck/PaycheckSummaryCard.vue";

export default {
  name: "MonthlySummaryView",

  components: {
    MonthPicker,
    PaycheckSummaryCard,
    PageHeader,
  },

  data() {
    return {
      title: "My Summary",
      selectedMonth: new Date().getMonth() + 1,
      selectedYear: new Date().getFullYear(),
      loading: true,
    };
  },

  computed: {
    summary() {
      return store.summary;
    },
  },

  mounted() {
    this.loadPaycheck();
  },

  methods: {
    handleMonthChange(value) {
      this.selectedMonth = value.month;
      this.selectedYear = value.year;
      this.loadPaycheck();
    },

    loadPaycheck() {
      this.loading = true;
      store
        .fetchPaycheck(store.user.id, this.selectedMonth, this.selectedYear)
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>