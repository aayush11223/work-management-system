<template>
  <v-navigation-drawer v-model="drawerValue" app dark>
    <v-list nav dense>
      <v-list-item-group active-class="grey darken-1--text text--accent-4">
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
    },
    group: {
      type: Boolean,
      default: null,
    },
    menuItems: {
      type: Array,
    },
  },
  computed: {
    drawerValue: {
      get() {
        return this.drawer;
      },
      set(newValue) {
        this.$emit("toggle", newValue);
      },
    },
  },
};
</script>