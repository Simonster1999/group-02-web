<template>
  <div>
    <b-container>
      <b-row class="content-row">
        <b-col>
          <b-col >
            <h1>Parents</h1>
            <div  v-for="parent in parents" v-bind:key="parent._id">
            <parent-item v-bind:parent="parent" v-on:show-rewards="getRewards"/>
            </div>
          </b-col>
        </b-col>
          <b-col>
          <h1>Rewards</h1>
            <div v-if="showRewards">
              <b-button class="createReward" v-on:click="(selectedCreate = true)">Create Reward</b-button>
              <div v-if="selectedCreate">
                <PostRewardForm v-on:postReward="createReward"/>
              </div>
            </div>
            <div v-if="selectedUpdate">
              <UpdateRewardForm v-on:updateReward="updateReward"/>
            </div>
            <div>
              <div  v-for="reward in rewards" v-bind:key="reward._id">
                <reward-item v-bind:reward="reward" v-on:patch-reward="toggleRewardEdit" v-on:del-reward="deleteReward"/>
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
import ParentItem from '@/components/ParentItem.vue'
import PostRewardForm from '@/components/PostRewardForm.vue'
import UpdateRewardForm from '@/components/UpdateRewardForm.vue'
export default {
  beforeCreate: function () { document.body.className = 'parent-reward' },
  name: 'parent-reward',
  components: {
    RewardItem,
    ParentItem,
    PostRewardForm,
    UpdateRewardForm
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
      price: '',
      is_bought: '',
      showRewards: false,
      selectedCreate: false,
      selectedUpdate: false,
      selectedParentId: '',
      selectedRewardId: ''
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
      this.showRewards = true
      this.selectedParentId = id
      Api.get('/parents/' + id + '/rewards')
        .then(response => {
          this.rewards = response.data.rewards
        })
    },
    toggleRewardEdit(id) {
      if (this.selectedRewardId === id) {
        this.selectedUpdate = false
        this.selectedRewardId = ''
      } else {
        this.selectedUpdate = true
        this.selectedRewardId = id
      }
    },
    updateReward(name, rewardDesc, price) {
      Api.put('/rewards/' + this.selectedRewardId, {
        reward_name: name,
        reward_desc: rewardDesc,
        price: price
      })
        .then(response => {
          const index = this.rewards.findIndex(reward => reward._id === this.selectedRewardId)
          this.rewards.splice(index, 1, response.data)
        })
        .catch(error => {
          console.error(error)
        })
    },
    createReward(name, rewardDesc, price) {
      Api.post('/parents/' + this.selectedParentId + '/rewards',
        {
          reward_name: name,
          reward_desc: rewardDesc,
          price: price,
          parent: this.selectedParentId
        })
        .then(response => {
          this.rewards.push(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style>
.parent-reward .deleteParent,
.parent-reward .editParent,
.parent-reward .showChildren,
.parent-reward .showQuests,
.parent-reward .buyReward {
  display: none;
}
</style>
