<template>
  <v-card class="pa-4">
    <div v-if="loading">
      <v-skeleton-loader type="table-row-divider" />
    </div>

    <div v-else>
      <v-simple-table>
        <tbody>
          <tr>
            <td>Base Salary</td>
            <td class="text-right">{{ summary.baseSalary }}</td>
          </tr>
          <tr>
            <td>Earned Base Salary</td>
            <td class="text-right">{{ summary.earnedBaseSalary }}</td>
          </tr>
          <tr>
            <td>Units Bonus</td>
            <td class="text-right">{{ summary.unitsBonus }}</td>
          </tr>
          <tr>
            <td>Gross Pay</td>
            <td class="text-right font-weight-medium">
              {{ summary.grossPay }}
            </td>
          </tr>
          <tr>
            <td>Tax Deduction</td>
            <td class="text-right error--text">{{ summary.taxDeduction }}</td>
          </tr>
          <tr>
            <td class="title font-weight-bold primary--text">Net Pay</td>
            <td class="text-right display-1 font-weight-bold primary--text">
              {{ summary.netPay }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "PaycheckSummaryCard",
  props: {
    summary: {
      type: Object,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
</style>
