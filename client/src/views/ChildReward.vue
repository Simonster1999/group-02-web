<template>
  <div>
    <b-container v-if="isConnected">
      <b-row class="content-row">
        <b-col cols="12" offset="0" sm="8" offset-sm="2" md="6" offset-md="0" class="col">
          <h1>Children</h1>
          <div v-for="child in children" v-bind:key="child._id">
            <child-item v-bind:child="child" v-on:show-rewards="login"/>
          </div>
        </b-col>
        <b-col cols="12" offset="0" sm="8" offset-sm="2" md="6" offset-md="0" class="col">
          <h1>Rewards</h1>
          <div v-if="selected">
          <div  v-for="reward in rewards" v-bind:key="reward._id">
            <reward-item v-bind:reward="reward" v-on:patch-reward="buyReward"/>
          </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'
import RewardItem from '@/components/RewardItem.vue'
import ChildItem from '@/components/ChildItem.vue'
export default {
  beforeCreate: function () {
    document.body.className = 'child-reward'
    Api.get('/poke').then(response => {
      this.isConnected = response.data.isConnected
      this.start()
    }).catch(error => {
      alert('Server unavailable')
      console.error(error)
    })
  },
  name: 'child-reward',
  components: {
    RewardItem,
    ChildItem
  },
  mounted() {
    console.log('PAGE is loaded')
  },
  data() {
    return {
      rewards: [],
      children: [],
      selected: false,
      childId: '',
      childBalance: '',
      isConnected: false,
      password: ''
    }
  },
  methods: {
    start() {
      Api.get('/children')
        .then(response => {
          this.children = response.data.children
        })
        .catch(error => {
          this.message = error.message
          console.error(error)
          this.children = []
        })
        .then(() => {
        })
    },
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
    login(parent, child, balance, username) {
      if (this.childId === child) {
        this.selected = false
        this.childId = ''
      } else {
        this.password = prompt('Enter password')
        if (this.password !== null) {
          Api.get('/children/login?username=' + username + '&password=' + this.password)
            .then(response => {
              if (response.data.status === true) {
                this.getRewards(parent, response.data.id, balance, username)
              } else {
                alert('Incorrect password')
              }
            })
            .catch(error => {
              this.message = error.message
              console.error(error)
              alert('Incorrect password')
            })
        }
      }
    },
    getRewards(parent, child, balance, username) {
      this.selected = true
      this.childId = child
      this.childBalance = balance
      Api.get('/parents/' + parent + '/rewards').then(response => {
        this.rewards = response.data.rewards.filter(reward => !reward.is_bought)
      })
        .catch(error => {
          this.message = error.message
          console.error(error)
          this.rewards = []
        })
        .then(() => {
        })
    },
    buyReward(rewardId, price) {
      this.selected = true
      if ((this.childBalance - price) >= 0) {
        Api.patch('/rewards/' + rewardId, { is_bought: true, bought_by: this.childId })
          .then(response => {
            const index = this.rewards.findIndex(reward => reward._id === rewardId)
            this.rewards.splice(index, 1)
          })
          .catch(error => {
            console.error(error)
          })
        Api.patch('/children/' + this.childId, { balance: this.childBalance - price })
          .then(response => {
            const index = this.children.findIndex(child => child._id === this.childId)
            var child = response.data
            this.children.splice(index, 1, child)
          })
          .catch(error => {
            console.error(error)
          })
        this.childBalance -= price
      } else (alert("You can't afford this reward ;)"))
    }
  }
}

</script>

<style>
.child-reward .editChild,
.child-reward .delChild,
.child-reward .showQuests,
.child-reward .delReward,
.child-reward .rewardBadge,
.child-reward .updateReward {
  display: none;
}
</style>
