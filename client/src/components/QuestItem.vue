<template>
  <div>
    <p>Name: {{quest.quest_name}}</p>
    <p>Quest Description: {{quest.quest_desc}}</p>
    <p>Reward: {{quest.money_bounty}}</p>
    <p>Date: {{ quest.date }} </p>
    <b-button variant="danger" v-on:click="$emit('del-quest', quest._id)">X</b-button>
    <b-button variant="warning" v-on:click="$emit('put-quest', quest._id)">Edit</b-button>
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
}
.row {
  border: solid;
}
div {
  margin-bottom: 10px;
  padding: 5px;
  border: solid;
  border-radius: 5px;
  background-color:rgb(179, 181, 166)
}

</style>
