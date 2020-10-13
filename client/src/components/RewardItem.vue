<template>
  <div>
       <div class="rewardBought" v-if="reward.is_bought">
           <h4>{{reward.reward_name}}</h4>
           <h6>{{reward.reward_desc}}</h6>
           <h6>Price: {{reward.price}}</h6>
           <b-badge class="rewardBadge" variant="success">Sold</b-badge>
           <p class ="buttons">
             <b-button class="delReward" variant="danger" v-on:click="$emit('del-reward', reward._id)">Delete</b-button>
             <b-button class="buyReward" variant="success" v-on:click="$emit('patch-reward', reward._id, reward.price)">Buy</b-button>
             <b-button class="updateReward" variant="warning" v-on:click="$emit('patch-reward', reward._id)">Edit</b-button>
           </p>
        </div>
        <div class="rewardNotBought" v-if="reward.is_bought === false">
            <h4>{{reward.reward_name}}</h4>
            <h6>{{reward.reward_desc}}</h6>
            <h6>Price: {{reward.price}}</h6>
            <b-badge class="rewardBadge" variant="warning">For sale</b-badge>
            <p class ="buttons">
              <b-button class="delReward" variant="danger" v-on:click="$emit('del-reward', reward._id)">Delete</b-button>
              <b-button class="buyReward" variant="success" v-on:click="$emit('patch-reward', reward._id, reward.price)">Buy</b-button>
              <b-button class="updateReward" variant="warning" v-on:click="$emit('patch-reward', reward._id)">Edit</b-button>
          </p>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'reward-item',
  props: ['reward'],
  data() {
    return {
      childName: ''
    }
  },
  created: function () {
    var child = ''
    if (this.$props.reward.is_bought) {
      Api.get('/children/' + this.$props.reward.bought_by)
        .then(response => {
          child = response.data
          this.childName = child.username
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}

</script>
<style scoped>
h4, h6 {
  color: black;
}
p {
  font-size: 20px;
  text-align: left;
  margin-left: 0px;
  color:black;
}
.row {
  border: solid;
}
.rewardBought, .rewardNotBought {
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
.rewardBadge {
  margin-bottom: 10px;
}

</style>
