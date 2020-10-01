<template>
       <div>
           <h1 class="p-3 mb-2 bg-dark text-dark"/>
           <p>Name: {{reward.reward_name}}</p>
           <p>Description: {{reward.reward_desc}}</p>
           <p>Price: {{reward.price}}</p>
           <b-button variant="danger" v-on:click="$emit('del-reward', reward._id)">X</b-button>
           <b-button variant="success" v-on:click="$emit('del-reward', reward._id)">Complete</b-button>
        </div>
</template>

<script>
export default {
  name: 'reward-item',
  props: ['reward']
}

</script>

<style scoped>
h1 {
background-color:rgb(44, 207, 112);
}
p {
font-size: 20px
}
.b-jumbotron {
  background-color:rgb(48, 104, 52);
}

</style>
