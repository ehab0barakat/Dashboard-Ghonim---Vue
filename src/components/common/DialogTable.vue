<template>
  <v-table table-border="2" fixed-header class="max-w-[95rem] max-h-[95rem] mx-auto my-10 overflow-y-auto ">

    <thead>
      <tr>
        <slot name="headers"></slot>
      </tr>
    </thead>

    <tbody>
      <slot name="body"></slot>
    </tbody>

  </v-table>
</template>

<script>
export default {

}
</script>

<style>

</style>
