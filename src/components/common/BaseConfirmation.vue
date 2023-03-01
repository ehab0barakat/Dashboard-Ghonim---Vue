<template>
  <v-dialog persistent v-model="showDialog" max-width="500px">
    <v-card>

      <v-card-title>
        <v-progress-linear v-show="isLoading" indeterminate color="primary" class="absolute top-0"></v-progress-linear>

        <span class="text-h5">{{ t('messages.deleteConfirmation') }}</span>

      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="isLoading" color="red" text @click="(showDialog = false)">
          {{ t('fields.close') }}
        </v-btn>
        <v-btn :loading="isLoading" color="primary" text @click="doDelete">
          {{ t('fields.confirm') }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useLocale } from 'vuetify';

export default {
  name: 'base-confirmation',
  props: ['show', 'loading'],
  emits: ['update:show', 'update:loading', 'delete'],
  setup() {
    const { t } = useLocale();
    return { t };
  },
  methods: {
    doDelete() {
      this.isLoading = true;
      this.$emit('delete');
    }
  },
  computed: {
    isLoading: {
      get() {
        return this.loading;
      },
      set(newValue) {
        this.$emit('update:loading', newValue);
      }
    },
    showDialog: {
      get() {
        return this.show;
      },
      set(newValue) {
        this.$emit('update:show', newValue);
      }
    }
  }
}
</script>

<style>

</style>
