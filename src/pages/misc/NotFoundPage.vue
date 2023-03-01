<template>

  <v-sheet color="background" class="w-full h-screen flex justify-center items-center">

    <v-card min-width="750" class="min-h-[40vh] flex flex-col justify-center items-center">

      <h1 class="text-9xl font-extrabold text-primary tracking-widest">404</h1>
      <div class="bg-dark text-white px-2 text-sm rounded rotate-12 absolute">
        {{ t('pageNotFound.title') }}
      </div>

      <v-btn variant="outlined" color="primary" class="mt-5">
        <router-link to="/">{{ t('pageNotFound.goHome') }}</router-link>
      </v-btn>

    </v-card>

  </v-sheet>

</template>

<script>
import { useLocale } from 'vuetify/lib/framework.mjs';

export default {
  name: 'not-found',
  setup() {
    const { t } = useLocale();

    return { t };
  }
}
</script>
