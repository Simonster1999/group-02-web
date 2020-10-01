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
  padding: 5px;
  border: solid;
  border-radius: 5px;
}
button {
  margin-right: 5px;
}
p {
  color: black;
}
</style>
