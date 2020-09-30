<template>
    <div>
      <p class="parentUsername">Username: {{parent.username}}</p>
      <b-button class="deleteParent" variant="danger" v-on:click="$emit('del-parent', parent._id)">X</b-button>
      <b-button class="editParent" variant="warning" v-on:click="$emit('edit-parent', parent._id)">Edit</b-button>
      <b-button class="showChildren" variant="secondary" v-on:click="$emit('show-children', parent._id)">Show children</b-button>
      <b-button class="showQuests" variant="warning" v-on:click="$emit('show-quests', parent._id)">Show Quests</b-button>
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
  background-color:rgb(179, 181, 166)
}
button {
  margin-right: 5px;
}
</style>
