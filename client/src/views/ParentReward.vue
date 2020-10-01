<template>
  <div>
    <b-container>
      <b-row>
        <b-col> <b-sidebar bg-variant="light" visible="true" width="20%" no-header-close > <div  v-for="parent in parents" v-bind:key="parent._id">
        <parent-item v-bind:parent="parent" v-on:show-rewards="getRewards"/>
        </div> </b-sidebar></b-col>
        <b-col> <b-sidebar bg-variant="light" visible="true" right="true" width="20%" no-header-close > <div  v-for="reward in rewards" v-bind:key="reward._id">
        <reward-item v-bind:reward="reward" v-on:del-reward="deleteReward"/>
        </div> </b-sidebar></b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'
import RewardItem from '@/components/RewardItem.vue'
import ParentItem from '@/components/ParentItem.vue'
export default {
  beforeCreate: function () { document.body.className = 'parent-reward' },
  name: 'parent-reward',
  components: {
    RewardItem,
    ParentItem
  },
  mounted() {
    console.log('PAGE is loaded')
    Api.get('/parents')
      .then(response => {
        this.parents = response.data.parents
      })
      .catch(error => {
        this.message = error.message
        console.error(error)
        this.parents = []
      })
      .then(() => {
      })
  },
  data() {
    return {
      rewards: [],
      parents: [],
      name: '',
      price: ''
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    deleteReward(id) {
      Api.delete(`/rewards/${id}`)
        .then(reponse => {
          const index = this.rewards.findIndex(reward => reward._id === id)
          this.rewards.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
    },
    getRewards(id) {
      Api.get('/parents/' + id + '/rewards')
        .then(response => {
          this.rewards = response.data.rewards
        })
    },
    createReward() {
      Api.post('/rewards',
        {
          reward_name: this.name,
          reward_desc: this.reward_desc,
          price: this.price,
          parent: '5f60b206ea77e02c3c712dc2'
        })
      Api.get('/rewards')
    }
  }
}
</script>

<style>
.parent-reward{
  background-color: rgb(5, 109, 11);
}
.parent-reward .deleteParent {
  display: none;
}
.parent-reward .editParent {
  display: none;
}
.parent-reward .showChildren {
  display: none;
}
.parent-reward .showQuests {
  display: none;
}
</style>
