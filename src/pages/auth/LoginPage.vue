<template>

  <v-sheet color="background" class="flex items-center justify-center w-full h-screen">

    <v-card :loading="isLoading" elevation="4" min-width="600" class="min-h-[50vh] w-[90vw] md:w-fit p-4">

      <v-container fluid class="flex flex-col items-center justify-center gap-4">

        <v-btn width="100" max-height="100" flat href="https://icon-ts.com">
          <v-img width="100" max-height="50" :src="logoUrl" :lazy-src="logoUrl" alt="icon-ts-logo"></v-img>
        </v-btn>

        <v-container class="flex flex-col items-center justify-center gap-2">

          <span class="text-gray-600 font-weight-medium text-h5">{{ t('loginPage.welcomeTitle') }}</span>

          <span class="text-gray-500 text-caption">{{ t('loginPage.welcomeSubtitle') }}</span>

        </v-container>

        <v-form @submit.prevent="submitForm" class="w-[80%] flex flex-col gap-4" lazy-validation>

          <v-text-field :disabled="isLoading" v-model="username" id="username" color="primary"
            :label="t('fields.username')" :placeholder="t('placeholders.enterUsername')" variant="outlined" required
            :error-messages="usernameErrors" @input="v$.username.$touch()" @blur="v$.username.$touch()"></v-text-field>

          <v-text-field :disabled="isLoading" v-model="password" id="password" color="primary" type="password"
            :label="t('fields.password')" :placeholder="t('placeholders.enterPassword')" variant="outlined"
            :error-messages="passwordErrors" required></v-text-field>

          <v-row align="center">

            <v-checkbox v-model="rememberMe" :disabled="isLoading" :label="t('loginPage.rememberMe')" color="primary"
              hide-details></v-checkbox>

            <v-btn :disabled="isLoading" variant="text" flat rounded class="text-subtitle-1 text-primary">{{
                t('loginPage.forgotPassword')
            }}</v-btn>

          </v-row>

          <v-btn :loading="isLoading" type="submit" color="primary" class="w-full p-2 mt-4">{{ t('loginPage.login')
          }}</v-btn>

        </v-form>

      </v-container>

    </v-card>

    <v-snackbar v-model="showSnackbar" :color="isError ? 'error' : 'success'">
      {{ msg }}
    </v-snackbar>

  </v-sheet>

</template>

<script>
import logoUrl from '@/assets/images/logo.webp';
import { useVuelidate } from '@vuelidate/core';
import {
  required,
  minLength,
  maxLength
} from '@/config/validation/validators';
import { validateErrorsIfExists } from '@/config/validation/util';
import { useLocale } from 'vuetify/lib/framework.mjs';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';

export default {
  name: 'login-page',
  setup() {
    const { t } = useLocale();

    const authStore = useAuthStore();

    const { name } = storeToRefs(authStore);
    const { sendLogin } = authStore;

    return {
      t,
      logoUrl,
      v$: useVuelidate(),
      name,
      sendLogin,
    };
  },
  data() {
    return {
      isLoading: false,
      isError: false,
      showSnackbar: false,
      msg: null,
      rememberMe: false,
      username: '',
      password: '',
    };
  },
  computed: {
    usernameErrors() {
      return validateErrorsIfExists(
        this.v$.username
      );
    },
    passwordErrors() {
      return validateErrorsIfExists(
        this.v$.password
      );
    },
  },
  validations() {
    return {
      username: { required, minLength: minLength(3), maxLength: maxLength(24) },
      password: { required, minLength: minLength(3), maxLength: maxLength(24) },
    };
  },
  methods: {
    async submitForm() {

      this.v$.$touch();

      if (this.v$.$errors.length > 0) return;

      this.isLoading = true;

      try {

        await this.sendLogin(
          this.rememberMe,
          {
            email: this.username,
            password: this.password,
          });

        this.showSnackbar = true;
        this.isError = false;
        this.msg = this.t('messages.authSuccess', { name: this.name });

        setTimeout(() => {
          this.$router.replace({
            name: 'home-page'
          });

          this.isLoading = false;
        }, 2000);

      } catch {
        this.showSnackbar = true;
        this.isError = true;
        this.msg = this.t('messages.authError');

        this.isLoading = false;
      }
    }
  }
}
</script>
