<template>
  <div>
    <b-container>
    <b-row class="content-row">
      <b-col cols="12" offset-xs="0" sm="10" offset-sm="1" md="3" offset-md="0" class="col">
        <h1>Child List</h1>
        <div v-for="child in children" v-bind:key="child._id">
          <child-item
            v-bind:child="child"
            v-on:show-quests="login"
          />
        </div>
      </b-col>
      <b-col cols="12" offset-xs="0" sm="10" offset-sm="1" md="6" offset-md="0" class="col">
        <b-calendar
          class="calendar"
          :date-info-fn="getDates"
          v-model="value"
          selected-variant="danger"
          block
          :hide-header="true"
        />
      </b-col>
      <b-col cols="12" offset-xs="0" sm="10" offset-sm="1" md="3" offset-md="0" class="col">
        <div v-if="selected">
          <h1>Quest List</h1>
          <div v-for="quest in specificQuests" v-bind:key="quest._id">
            <quest-item
              v-bind:quest="quest"
              v-on:complete-quest="completeQuest"
            />
          </div>
        </div>
      </b-col>
    </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'
import QuestItem from '@/components/QuestItem.vue'
import ChildItem from '@/components/ChildItem.vue'
export default {
  beforeCreate: function () {
    document.body.className = 'child-quest'
  },
  name: 'child-quests',
  components: {
    QuestItem,
    ChildItem
  },
  mounted() {
    console.log('PAGE is loaded')
    Api.get('/children')
      .then((response) => {
        this.children = response.data.children
      })
      .catch((error) => {
        this.message = error.message
        console.error(error)
        this.quests = []
      })
      .then(() => {})
  },
  data() {
    return {
      quests: [],
      children: [],
      name: '',
      quest_desc: '',
      money_bounty: '',
      value: '',
      selectedParentId: '',
      selectedChildId: '',
      selected: '',
      selectedChildBalance: '',
      questDates: [],
      specificQuests: [],
      password: ''
    }
  },
  methods: {
    getQuests(id, childId, childBalance, username) {
      this.selectedChildId = childId
      this.selectedChildBalance = childBalance
      this.selected = true
      this.selectedParentId = id
      Api.get('/parents/' + id + '/quests')
        .then((response) => {
          this.quests = response.data.quests
        })
        .catch((error) => {
          this.message = error.message
          console.error(error)
          this.quests = []
        })
        .then(() => {})
      this.specificQuests = []
    },
    login(parent, id, balance, username) {
      if (this.selectedChildId === id) {
        this.selected = false
        this.selectedChildId = ''
      } else {
        this.password = prompt('Enter password')
        Api.get('/children/login/' + username + '/' + this.password)
          .then(response => {
            if (response.data.status === true) {
              this.getQuests(parent, response.data.id, balance, username)
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
    },
    getDates(ymd, date) {
      this.getProperDate()
      this.specificQuests = []
      this.getSpecificQuests()
      var day = ymd
      for (var i = 0; i < this.questDates.length; i++) {
        if (day === this.questDates[i]) {
          return this.questDates[i] ? 'table-danger' : ''
        }
      }
    },
    getSpecificQuests() {
      var k = 0
      for (var i = 0; i < this.quests.length; i++) {
        if (this.quests[i].date === this.value + 'T00:00:00.000Z') {
          this.specificQuests[k] = this.quests[i]
          k++
        }
      }
    },
    getProperDate() {
      this.questDates = []
      if (this.selected) {
        for (var i = 0; i < this.quests.length; i++) {
          var questDate = this.quests[i].date
          questDate = questDate.substring(0, questDate.length - 14)
          this.questDates[i] = questDate
        }
      } else {
        this.questDates = []
      }
    },
    completeQuest(id) {
      Api.patch(`/quests/${id}`, {
        is_pending: true,
        completed_by: this.selectedChildId
      }).then((response) => {
        var quest = response.data
        const index = this.quests.findIndex((quest) => quest._id === id)
        this.quests.splice(index, 1, quest)
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}

</script>

<style>
.child-quest .acceptQuest,
.child-quest .delChild,
.child-quest .editChild,
.child-quest .delQuest,
.child-quest .editQuest,
.child-quest .showRewards {
  display: none;
}
.child-quest .createQuestFormBox {
  background-color: rgb(82, 71, 36);
  color: rgba(247, 210, 2, 0.75);
  padding: 15px;
  border: solid;
  border-radius: 20px;
}
.child-quest .createQuestBtn {
  margin-bottom: 10px;
}
.child-quest .childDiv {
  text-align: center;
}
.child-quest h1 {
  text-align: center;
}
.child-quest .createQuestHeader {
  background-color: rgb(114, 85, 46);
  color: rgba(247, 210, 2, 0.75);
  padding: 5px;
  border: solid;
  border-radius: 5px;
  font-size: 1.2em;
}
.child-quest .pending {
  display: none;
}
</style>
