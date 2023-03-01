<template>
  <div class="relative text-center">

    <v-dialog v-model="showDialog" persistent max-width="600px">

      <v-card>

        <v-card-title>
          <v-progress-linear v-show="isLoading" indeterminate color="primary"
            class="absolute top-0"></v-progress-linear>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>

        <v-card-text>

          <v-container>
            <slot></slot>
          </v-container>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :disabled="isLoading" color="red" text @click="showDialog = false">
            {{ t('fields.close') }}
          </v-btn>

          <v-btn :loading="isLoading" color="primary" text @click="$emit('on-save')">
            {{ t('fields.save') }}
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-dialog>

  </div>
</template>

<script>
import { useLocale } from 'vuetify';

export default {
  name: 'base-edit-dialog',
  setup() {
    const { t } = useLocale();
    return { t };
  },
  props: ['show', 'loading', 'title'],
  emits: ['update:show', 'update:loading', 'on-save'],
  computed: {
    showDialog: {
      get() {
        return this.show;
      },
      set(newValue) {
        this.$emit('update:show', newValue)
      }
    },
    isLoading: {
      get() {
        return this.loading;
      },
      set(newValue) {
        this.$emit('update:loading', newValue)
      }
    }
  },
}
</script>

<style>

</style>
