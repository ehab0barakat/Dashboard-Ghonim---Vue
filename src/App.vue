<template>
  <v-app color="background">
    <router-view v-slot="{ Component }">
      <v-slide-x-reverse-transition class="duration-1000" mode="out-in">
        <component :is="Component"/>
      </v-slide-x-reverse-transition>
    </router-view>
  </v-app>
</template>

<script>
import {useAuthStore} from '@/store/auth';
import {storeToRefs} from 'pinia';

export default {
  setup() {

    const authStore = useAuthStore();

    const {didAutoLogout} = storeToRefs(authStore);
    const {tryLogin} = authStore;

    return {
      didAutoLogout,
      tryLogin
    };
  },
  created() {
    this.tryLogin();
  },
  watch: {
    didAutoLogout() {
      if (this.didAutoLogout)
        this.$router.replace({
          name: 'auth-login'
        });
    }
  }
}
</script>
