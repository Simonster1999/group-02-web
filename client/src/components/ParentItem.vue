<template>
    <div>
      <p>Username: {{parent.username}}</p>
      <b-button variant="danger" v-on:click="$emit('del-parent', parent._id)">X</b-button>
      <b-button variant="warning" v-on:click="$emit('edit-parent', parent._id)">Edit</b-button>
      <b-button variant="secondary" v-on:click="$emit('show-children', parent._id)">Show children</b-button>
    </div>
</template>

<script>
export default {
  name: 'parent-item',
  props: ['parent']
}
</script>

<style scoped>
div {
  margin-bottom: 10px;
  padding: 5px;
  border: solid;
  border-radius: 5px;
}
button {
  margin-right: 5px;
}
</style>
