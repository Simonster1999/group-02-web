<template>
  <div>
    <p>Name: {{quest.quest_name}}</p>
    <p>Quest Description: {{quest.quest_desc}}</p>
    <p>Reward: {{quest.money_bounty}}</p>
    <p>Date: {{ quest.date }} </p>
    <b-button class="delQuest" variant="danger" v-on:click="$emit('del-quest', quest._id)">X</b-button>
    <b-button class="editQuest" variant="warning" v-on:click="$emit('patch-quest', quest._id)">Edit</b-button>
    <b-button class="completeQuest" variant="success" v-on:click="$emit('complete-quest', quest._id, quest.money_bounty)">Complete</b-button>
  </div>
</template>
<script>
export default {
  name: 'quest-item',
  props: ['quest'],
  data() {
    return {
      value: ''
    }
  },
  methods: {
  }
}

</script>

<style scoped>
p {
  font-size: 20px;
  text-align: left;
  margin-left: 5px;
  color:black;
}
.row {
  border: solid;
}
div {
  margin-bottom: 10px;
  padding: 10px;
  border: solid;
  border-color:rgb(84, 84, 84);
  border-radius: 20px;
  background-color:rgb(179, 181, 166)
}

</style>
