<template>
       <div>
           <h4>{{reward.reward_name}}</h4>
           <h6>{{reward.reward_desc}}</h6>
           <h6>Price: {{reward.price}}</h6>
           <b-badge class="rewardBought" variant="success"> Bought: {{reward.is_bought}}</b-badge>
           <p class ="buttons">
             <b-button class="delReward" variant="danger" v-on:click="$emit('del-reward', reward._id)">Delete</b-button>
             <b-button class="buyReward" variant="success" v-on:click="$emit('patch-reward', reward._id, reward.price)">Buy</b-button>
             <b-button class="updateReward" variant="warning" v-on:click="$emit('patch-reward', reward._id)">Edit</b-button>
           </p>
        </div>
</template>

<script>
export default {
  name: 'reward-item',
  props: ['reward']
}

</script>
<style scoped>
h4, h6 {
  color: black;
}
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
  background-image: linear-gradient(140deg, rgb(211, 211, 210), rgb(138, 139, 127));
}
.delReward {
  margin-right: 10px;
}
.rewardBought {
  margin-bottom: 10px;
}
.buttons {
  margin-left: 0px
}

</style>
