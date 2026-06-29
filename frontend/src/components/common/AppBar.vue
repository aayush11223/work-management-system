<template>
  <v-app-bar app dark flat>
    <v-container class="d-flex align-center justify-center">
      <v-app-bar-nav-icon @click="toggleNav"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- v-menu -->
      <v-menu transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center">
            <v-btn class="mr-1" dark icon v-bind="attrs" v-on="on">
              <v-icon x-large> mdi-account-circle </v-icon>
            </v-btn>
            <h3 class="pr-2 font-weight-regular">{{ userName }}</h3>
          </div>
        </template>

        <v-list>
          <v-list-item to="/profile">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>

          <!-- Dynamic Toggle Route -->
          <v-list-item @click="handleToggle">
            <v-list-item-title>{{ toggleTitle }}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>

          <!-- Logout -->
          <v-list-item>
            <v-dialog v-model="dialog" persistent max-width="300">
              <template v-slot:activator="{ on, attrs }">
                <div class="red--text" v-bind="attrs" v-on="on">Log Out</div>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  Do you want to logout?
                </v-card-title>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="logout">
                    YES
                  </v-btn>
                  <v-btn @click="dialog = false" color="red darken-1" text>
                    NO
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>

<script>
import { store } from "@/store/store.js";
export default {
  data() {
    return {
      dialog: false,
    };
  },

  props: {
    drawer: {
      type: Boolean,
    },
    title: {
      type: String,
    },
  },

  computed: {
    userName() {
      return store.user ? store.user.name : "";
    },
    isUser() {
      return !this.$route.path.startsWith("/admin");
    },
    toggleTitle() {
      return this.isUser ? "Go to Admin" : "Go to User";
    },
  },

  methods: {
    logout() {
      store.logout();
      this.dialog = false;
      this.$router.push("/login");
    },

    toggleNav() {
      this.$emit("enable", !this.drawer);
    },

    handleToggle() {
      if (this.isUser) {
        this.$router.push("/admin/dashboard");
      } else {
        this.$router.push("/dashboard");
      }
    },
  },
};
</script>
