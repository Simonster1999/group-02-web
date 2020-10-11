<template>
  <div class="childDiv">
    <p class="childP">Username: {{child.username}}</p>
    <p class="childP">Balance: {{child.balance}}</p>
    <b-button class="delChild" variant="danger" v-on:click="$emit('del-child', child._id)">X</b-button>
    <b-button class="editChild" variant="warning" v-on:click="$emit('edit-child', child._id)">Edit</b-button>
    <b-button class="showQuests" variant="warning" v-on:click="$emit('show-quests', child.parent, child._id, child.balance)">Show Quests</b-button>
    <b-button class="showRewards" variant="secondary" v-on:click="$emit('show-rewards', child.parent, child._id, child.balance)">Show Rewards</b-button>
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
  padding: 10px;
  border: solid;
  border-color: rgb(84, 84, 84);
  border-radius: 10px;
  background-image: linear-gradient(140deg, rgb(211, 211, 210), rgb(138, 139, 127));
}
.childP {
  font-size: 1.5em;
}
button {
  margin-right: 5px;
}
p {
  color: black;
}
</style>
