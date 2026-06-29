

<template>
  <div
    class="d-flex justify-center align-center bg"
    style="height: 100vh; width: 100%"
  >
    <v-card
      class="d-flex flex-column justify-center pa-10 rounded-lg"
      dark
      flat
      height="500"
      :width="$vuetify.breakpoint.xs ? '90%' : '387px'"
      style="
        background-color: rgba(30, 58, 138, 0.2);
        backdrop-filter: blur(4px) brightness(0.83) contrast(89%);
      "
    >
      <h2 class="mb-6 white--text">Log In</h2>

      <v-form ref="form" @submit.prevent="handleLogin">
        <v-text-field
          v-model="email"
          placeholder="Enter your email"
          :rules="emailRules"
          dense
          autocomplete="new-email"
          name="new-email"
          class="mb-2"
        />
        <v-text-field
          v-model="password"
          placeholder="Enter your password"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          dense
          autocomplete="new-password"
          name="new-password"
          class="mb-4"
        />
        <br />
        <v-btn
          type="submit"
          block
          height="42px"
          :loading="loading"
          style="background-color: rgb(22, 31, 68); flex: 0 0 auto"
        >
          Log In
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { store } from "@/store/store.js";

export default {
  name: "LogIn",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loading: false,
      errorMessage: "",

      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Enter a valid email",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Minimum 6 characters",
      ],
    };
  },
  methods: {
    handleLogin() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;
      this.errorMessage = "";

      store
        .login(this.email, this.password)
        .then((data) => {
          if (data.user.role === "admin") {
            this.$router.push("/admin/dashboard");
          } else {
            this.$router.push("/dashboard");
          }
        })
        .catch(() => {
          this.errorMessage = "Invalid email or password";
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.bg {
  background-image: url("@/assets/login.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>