<template>
  <v-table
    fixed-header
    height="70vh"
    class="max-w-[95rem] mx-auto my-10 overflow-y-auto">

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
export default {}
</script>
