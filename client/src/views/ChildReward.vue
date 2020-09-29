<template>
  <div>
    <b-container>
      <b-row>
        <b-col> <b-sidebar bg-variant="light" visible="true" right="true" width="35%" no-header-close > <div  v-for="reward in rewards" v-bind:key="reward._id">
        <reward-item v-bind:reward="reward" v-on:del-reward="deleteReward"/>
        </div> </b-sidebar>
        <b-sidebar bg-variant="light" visible="true" width="20%" no-header-close > <div  v-for="child in children" v-bind:key="child._id">
        <reward-item v-bind:reward="reward"/>
        </div> </b-sidebar></b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'
import RewardItem from '@/components/RewardItem.vue'
export default {
  beforeCreate: function () { document.body.className = 'child-reward' },
  name: 'child-reward',
  components: {
    RewardItem
  },
  mounted() {
    console.log('PAGE is loaded')
    Api.get('/rewards')
      .then(response => {
        this.rewards = response.data.rewards
      })
      .catch(error => {
        this.message = error.message
        console.error(error)
        this.rewards = []
      })
      .then(() => {
      })
  },
  data() {
    return {
      rewards: [],
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
    createReward() {
      Api.post('/rewards',
        {
          reward_name: this.name,
          reward_desc: this.reward_desc,
          price: this.price,
          parent: '5f60b206ea77e02c3c712dc2'
        })
      Api.get('/rewards')
    },
    getRewards(id) {
      if (this.selectedId === id) {
        this.selected = false
        this.selectedId = ''
      } else {
        this.selected = true
        this.selectedId = id
        Api.get('/parents/' + id + '/rewards').then(response => {
          this.rewards = response.data.rewards
        })
          .catch(error => {
            this.message = error.message
            console.error(error)
            this.children = []
          })
          .then(() => {
          })
      }
    }
  }
}

</script>

<style scoped>
.child-reward{
  background-color: rgb(5, 109, 11);
}

</style>
