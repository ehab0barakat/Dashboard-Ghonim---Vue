<template>
  <v-list-item :prepend-avatar="photoUrl" :title="name" nav>
    <template v-slot:append>
      <v-btn variant="text" icon="mdi-chevron-left" @click.stop="$emit('toggle-rail')"></v-btn>
    </template>
  </v-list-item>

</template>

<script>
export default {
  name: 'nav-photo',
  emits: ['toggle-rail'],
  props: {
    photoUrl: String,
    name: String,
  }
}
</script>

<style>

</style>
