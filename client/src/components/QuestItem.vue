<template>
       <div>
         <b-container>
           <b-row>
           <p>Name: {{quest.quest_name}}</p>
           <br>
           <p>Quest Description: {{quest.quest_desc}}</p>
           <br>
           <p>Reward: {{quest.money_bounty}}</p>
           <p>Date: {{ quest.date }} </p>
      <b-button variant="danger" v-on:click="$emit('del-quest', quest._id)">X</b-button>
      <b-button variant="warning" v-on:click="$emit('put-quest', quest._id)">Edit</b-button>
       </b-row>
      </b-container>
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
.container {
  background-color:rgb(179, 181, 166)
}

</style>
