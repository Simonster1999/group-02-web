<template>
  <div>
    <div class="div-border" v-if="quest.is_completed === false && quest.is_pending === false">
    <p>Name: {{quest.quest_name}}</p>
    <p><span style="font-weight: bold">Quest Description: </span>{{quest.quest_desc}}</p>
    <p>Reward: {{quest.money_bounty}}</p>
    <b-button class="delQuest" variant="danger" v-on:click="$emit('del-quest', quest._id)">X</b-button>
    <b-button class="editQuest" variant="warning" v-on:click="$emit('patch-quest', quest._id)">Edit</b-button>
    <b-button class="completeQuest" variant="success" v-on:click="$emit('complete-quest', quest._id, quest.money_bounty)">Complete</b-button>
    </div>
    <div class="div-borderpending" v-if="quest.is_pending === true && quest.is_completed === false">
    <p>Name: {{quest.quest_name}}</p>
    <p><span style="font-weight: bold">Quest Description: </span>{{quest.quest_desc}}</p>
    <p>Reward: {{quest.money_bounty}}</p>
    <p class="pending">Completed by: {{childName}}</p>
    <p class="p-center">Pending...</p>
    <b-button class="acceptQuest" variant="success" v-on:click="$emit('accept-quest', quest._id, quest.money_bounty)">Accept</b-button>
    <b-button class="denyQuest" variant="danger" v-on:click="$emit('deny-quest', quest._id)">Deny</b-button>
    </div>
    <div class="div-bordercomplete" v-if="quest.is_completed && quest.is_pending === true">
    <p>Name: {{quest.quest_name}}</p>
    <p><span style="font-weight: bold">Quest Description: </span>{{quest.quest_desc}}</p>
    <p>Reward: {{quest.money_bounty}}</p>
    <p>Completed by: {{childName}}</p>
    <p class="p-center">Completed!</p>
    <b-button class="delQuest" variant="danger" v-on:click="$emit('del-quest', quest._id)">X</b-button>
    </div>
  </div>
</template>
<script>
import { Api } from '@/Api'
export default {
  name: 'quest-item',
  props: ['quest'],
  data() {
    return {
      value: '',
      childName: ''
    }
  },
  created: function () {
    var child = ''
    if (this.$props.quest.is_completed || this.$props.quest.is_pending) {
      Api.get('/children/' + this.$props.quest.completed_by)
        .then(response => {
          child = response.data
          this.childName = child.username
        })
        .catch(error => {
          console.error(error)
        })
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
  color:black;
}
.row {
  border: solid;
}
.p-center {
  text-align: center;
  padding: 0px;
  border: 0px;
  margin: 0px
}
.div-border{
  margin-bottom: 10px;
  border: solid;
  border-color:rgb(84, 84, 84);
  background-image: linear-gradient(140deg, rgb(211, 211, 210), rgb(138, 139, 127));
  text-align:center;
  border-radius: 10px;
  padding-bottom: 5px
}
.div-bordercomplete{
  margin-bottom: 10px;
  border: solid;
  border-color:rgb(11, 65, 11);
  background-image: linear-gradient(140deg, rgb(115, 238, 115), rgb(41, 92, 41));
  text-align: center;
  border-radius: 10px;
  padding-bottom: 5px
}
.div-borderpending{
  margin-bottom: 10px;
  border: solid;
  border-color:rgb(177, 194, 27);
  background-image: linear-gradient(140deg, rgb(171, 199, 69), rgb(87, 92, 41));
  text-align: center;
  border-radius: 10px;
  padding-bottom: 5px
}
</style>
