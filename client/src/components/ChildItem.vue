<template>
  <div>
    <p>Username: {{child.username}}</p>
    <p>Balance: {{child.balance}}</p>
    <b-button variant="danger" v-on:click="$emit('del-child', child._id)">X</b-button>
  </div>
</template>

<script>
export default {
  name: 'child-item',
  props: ['child']
}

</script>

<style>
.b-jumbotron {
  background-color:blue
}
</style>
