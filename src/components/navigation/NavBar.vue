<template>
  <v-navigation-drawer color="dark" v-model="drawer" :rail="rail" permanent>
    <!-- Photo -->
    <nav-photo @click="rail = false" :photoUrl="avatarImage" :name="name" @toggle-rail="toggleRail"></nav-photo>

    <v-divider></v-divider>

    <v-list density="compact" class="overflow-y-auto no-scrollbar" nav max-height="90vh">
      <!-- Home -->
      <v-list-item prepend-icon="mdi-home-city-outline" :title="t('nav.home')" value="home" :to="{
                  name: 'home-page',
                }" rounded="xl"></v-list-item>

      <v-divider color="primary" :thickness="2" class="mt-2"></v-divider>

      <!-- Users -->
      <v-list-item v-if="pUsers" prepend-icon="mdi-account-edit" :title="t('nav.users')" value="users" :to="{
                  name: 'users-page',
                }" rounded="xl"></v-list-item>

      <v-divider color="primary" :thickness="2" class="mt-2"></v-divider>

      <!-- Language -->
      <v-list-item @click="toggleLocale" prepend-icon="mdi-web" :title="t('nav.language')" :active="false" value="locale"
        rounded="xl"></v-list-item>

      <!-- Theme -->
      <v-list-item @click="toggleTheme" prepend-icon="mdi-brightness-6" :title="t('nav.theme')" :active="false"
        value="theme" rounded="xl"></v-list-item>

      <!-- Logout -->
      <v-list-item @click="doLogout" prepend-icon="mdi-door" :title="t('nav.logout')" :active="false" value="logout"
        rounded="xl"></v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
import NavPhoto from "@/components/navigation/NavPhoto.vue";

import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { useLocale, useTheme } from "vuetify";

export default {
  name: "nav-bar",
  setup() {
    const { t } = useLocale();

    const authStore = useAuthStore();

    const { name, photoUrl, permissions, type } = storeToRefs(authStore);
    const { logout } = authStore;

    const { current } = useLocale();
    const theme = useTheme();

    return {
      t,
      logout,
      name,
      photoUrl,
      permissions,
      type,
      toggleLocale: () => (current.value = current.value == "en" ? "ar" : "en"),
      toggleTheme: () =>
      (theme.global.name.value = theme.global.current.value.dark
        ? "light"
        : "dark"),
    };
  },
  components: {
    NavPhoto,
  },
  data() {
    return {
      drawer: true,
      rail: true,
      pUsers: false,
    };
  },
  beforeMount() {
    this.checkPermissions();
  },
  computed: {
    avatarImage() {
      return this.photoUrl ? this.photoUrl : null;
    },
  },
  methods: {
    toggleRail() {
      this.rail = !this.rail;
    },
    toggleLocale() {
      this.toggleLocale();
    },
    toggleTheme() {
      this.toggleTheme();
    },
    doLogout() {
      this.logout();
      this.$router.replace({
        name: "auth-login",
      });
    },
    checkPermissions() {
      if (this.type === "-1") {

        this.pUsers = true;
      } else if (this.type === "0" || this.type === "1") {

        const p = JSON.parse(this.permissions)
        for (const item in p) {
          if (p[item].name === "users") this.pUsers = true;
        }
      }

    },
  },
};
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
