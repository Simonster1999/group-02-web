<template>
  <div>
    <b-container>
      <b-row>
        <b-col><calendar/>
        <b-button v-on:click="createQuest">Create Quest</b-button>
        <b-form-input v-model="name" placeholder="Enter quest name"></b-form-input>
        <b-form-input v-model="quest_desc" placeholder="Enter quest description"></b-form-input>
        <b-form-input v-model="money_bounty" placeholder="Enter reward"></b-form-input>
        </b-col>
        <b-col> <b-sidebar bg-variant="light" visible="true" right="true" width="35%" no-header-close > <div  v-for="quest in quests" v-bind:key="quest._id">
        <quest-item v-bind:quest="quest" v-on:del-quest="deleteQuest"/>
        </div> </b-sidebar></b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api' 
import QuestItem from '@/components/QuestItem.vue'
import Calendar from '@/components/Calendar.vue'
export default {
  beforeCreate: function () { document.body.className = 'parent-quest' },
  name: 'quests',
  components: {
    QuestItem,
    Calendar
  },
  mounted() {
    console.log('PAGE is loaded')
    Api.get('/quests')
      .then(response => {
        this.quests = response.data.quests
      })
      .catch(error => {
        this.message = error.message
        console.error(error)
        this.quests = []
      })
      .then(() => {
      })
  },
  data() {
    return {
      quests: [],
      name: '',
      quest_desc: '',
      money_bounty: ''
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
    deleteQuest(id) {
      Api.delete(`/quests/${id}`)
        .then(reponse => {
          const index = this.quests.findIndex(quest => quest._id === id)
          this.quests.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
    },
    createQuest() {
      Api.post('/quests',
        {
          params:
            {
              quest_name: this.quests.quest_name,
              quest_desc: this.quests.quest_desc,
              money_bounty: this.quests.money_bounty,
              date: this.quests.date,
              parent: this.quests.parent
            }
        })
    }
  }
}

</script>

<style>
.parent-quest{
  background-color: rgb(82, 71, 36);
}

</style>
