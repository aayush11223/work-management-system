<template>
  <div>
    <v-tabs dark v-model="activeTab">
      <v-tab>Profile Info</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <v-card flat class="mt-4">
          <v-simple-table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{{ user.name }}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <td>Department</td>
                <td>{{ user.department }}</td>
              </tr>
              <tr>
                <td>Role</td>
                <td>{{ user.role }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { store } from "@/store/store.js";
export default {
  name: "ProfileView",

  data() {
    return {
      activeTab: 0,
    };
  },

  computed: {
    user() {
      return store.user;
    },
  },
};
</script>