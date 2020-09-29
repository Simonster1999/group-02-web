<template>
       <div>
           <h1 class="p-3 mb-2 bg-dark text-dark"/>
          <b-container class="bv-example-row">
           <b-row>
             <b-col><b-button variant="warning" v-on:click="$emit('put-quest', quest._id)">Edit</b-button></b-col>
             <b-col><b-button variant="danger" v-on:click="$emit('del-quest', quest._id)">X</b-button></b-col>
           </b-row>
          </b-container>
           <p>Name: {{quest.quest_name}}</p>
           <p>Quest Description: {{quest.quest_desc}}</p>
           <p>Reward: {{quest.money_bounty}}</p>
           <p>Date: {{ quest.date }} </p>
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

<style>
h1 {
background-color:burlywood;
}
p {
font-size: 20px
}
.b-jumbotron {
  background-color:blue
}

</style>
