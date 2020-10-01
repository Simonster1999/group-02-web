<template>
  <div>
    <p>Username: {{child.username}}</p>
    <p>Balance: {{child.balance}}</p>
    <b-button variant="danger" v-on:click="$emit('del-child', child._id)">X</b-button>
    <b-button variant="warning" v-on:click="$emit('edit-child', child._id)">Edit</b-button>
  </div>
</template>

<script>
export default {
  name: 'child-item',
  props: ['child']
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
