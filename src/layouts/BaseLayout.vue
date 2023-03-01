<template>

  <v-sheet color="background" class="flex items-center justify-center w-full h-screen">

    <nav-bar></nav-bar>

    <v-main class="w-full h-full">
      <router-view name="main" v-slot="{ Component }">
        <v-slide-x-reverse-transition class="duration-700" mode="out-in">
          <component :is="Component" />
        </v-slide-x-reverse-transition>
      </router-view>
    </v-main>

    <v-snackbar v-model="snackbar" :color="isError ? 'error' : 'success'">
      {{ msg }}
    </v-snackbar>

    <base-confirmation v-model:show="showConfirm" v-model:loading="isLoading"
      @delete="onConfirmDelete"></base-confirmation>

  </v-sheet>

</template>

<script>
import NavBar from '@/components/navigation/NavBar.vue';

export default {
  name: 'base-layout',
  components: {
    NavBar,
  },
  provide() {
    return {
      showSnackbar: this.showSnackbar,
      showConfirmDialog: this.showConfirmDialog,
      hideConfirmDialog: this.hideConfirmDialog,
    }
  },
  data() {
    return {
      isLoading: false,
      isError: false,
      snackbar: false,
      msg: null,
      showConfirm: false,
      deleteCallback: null,
    };
  },
  methods: {
    showSnackbar(isError, msg) {
      this.isError = isError,
        this.msg = msg;
      this.snackbar = true;
    },
    showConfirmDialog(confirmCallback) {
      this.showConfirm = true;
      this.deleteCallback = confirmCallback;
    },
    hideConfirmDialog() {
      this.showConfirm = false;
      this.isLoading = false;
    },
    onConfirmDelete() {
      this.isLoading = true;
      this.deleteCallback();
    }
  }
}
</script>

<style>

</style>
