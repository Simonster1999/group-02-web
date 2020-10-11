<template>
  <div class="parentDiv">
    <p class="parentUsername">Username: {{parent.username}}</p>
    <b-button class="deleteParent" variant="danger" v-on:click="$emit('del-parent', parent._id)">X</b-button>
    <b-button class="editParent" variant="warning" v-on:click="$emit('edit-parent', parent._id)">Edit</b-button>
    <b-button class="showChildren" variant="secondary" v-on:click="$emit('show-children', parent._id)">Show children</b-button>
    <b-button class="showQuests" variant="warning" v-on:click="$emit('show-quests', parent._id)">Show Quests</b-button>
    <b-button class="showRewards" variant="secondary" v-on:click="$emit('show-rewards', parent._id)">Select</b-button>
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
  padding: 10px;
  border: solid;
  border-color: rgb(84, 84, 84);
  border-radius: 10px;
  background-image: linear-gradient(140deg, rgb(211, 211, 210), rgb(138, 139, 127));
}
.parentUsername {
  font-size: 1.5em;
}
p {
  color:black;
}
button {
  margin-right: 5px;
}
</style>
