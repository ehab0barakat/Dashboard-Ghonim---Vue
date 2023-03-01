<template>
  <v-container>

    <slot name="card"></slot>

    <v-slide-y-transition mode="out-in">

      <v-row align="center"
             justify="center"
             class="min-h-[70vh]"
             v-if="isLoading">

        <v-progress-circular
          :size="120"
          color="primary"
          indeterminate>
        </v-progress-circular>

      </v-row>

      <base-table v-else>
        <template #headers>
          <slot name="headers"></slot>
        </template>

        <template #body>
          <slot name="body"></slot>
        </template>
      </base-table>

    </v-slide-y-transition>

    <v-row class="15vh" justify="center" align="center">
      <v-col cols="12">
        <slot name="pagination"></slot>
      </v-col>
    </v-row>

    <slot name="extra"></slot>

  </v-container>
</template>

<script>
export default {
  name: "base-table-layout",
  props: ['isLoading'],
};
</script>
