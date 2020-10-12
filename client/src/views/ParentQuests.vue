<template>
  <div>
      <b-row class="content-row">
        <b-col>
          <h1>Parent List</h1>
          <div v-for="parent in parents" v-bind:key="parent._id">
            <parent-item
              v-bind:parent="parent"
              v-on:show-quests="getQuests"
            />
          </div>
        </b-col>
        <b-col>
          <b-calendar
            class="calendar"
            :date-info-fn="getDates"
            v-model="value"
            selected-variant="danger"
            width="480px"
            :hide-header="true"
          />
        </b-col>
        <b-col>
          <div v-if="selected">
            <h1>Quest List</h1>
              <b-button
                class="createQuestBtn"
                variant="warning"
                v-on:click="(selectedCreate = true), (selectedEdit = false)"
                >Create Quest</b-button
              >
            <div v-if="selectedEdit">
              <div class="createQuestFormBox">
                <h1 class="createQuestHeader">Edit Quest</h1>
                <b-form autocomplete="off">
                  <b-form-input
                    v-model="name"
                    placeholder="Enter quest name"
                  ></b-form-input>
                  <b-form-input
                    v-model="quest_desc"
                    placeholder="Enter quest description"
                  ></b-form-input>
                  <b-form-input
                    v-model="money_bounty"
                    placeholder="Enter reward amount"
                  ></b-form-input>
                  <b-form-input
                    v-model="value"
                    placeholder="Select date"
                  ></b-form-input>
                  <b-button variant="light" v-on:click="patchQuest"
                    >Add
                  </b-button>
                  <b-button variant="warning" v-on:click="cancelEdit"
                    >Cancel
                  </b-button>
                </b-form>
              </div>
            </div>
            <div v-if="selectedCreate">
              <div class="createQuestFormBox">
                <h1 class="createQuestHeader">Create Quest</h1>
                <b-form autocomplete="off">
                  <b-form-input
                    v-model="name"
                    placeholder="Enter quest name"
                  ></b-form-input>
                  <b-form-input
                    v-model="quest_desc"
                    placeholder="Enter quest description"
                  ></b-form-input>
                  <b-form-input
                    v-model="money_bounty"
                    placeholder="Enter reward amount"
                  ></b-form-input>
                  <b-form-input
                    v-model="value"
                    placeholder="Select date"
                  ></b-form-input>
                  <b-button variant="light" v-on:click="createQuest"
                    >Add
                  </b-button>
                  <b-button variant="warning" v-on:click="cancelCreate"
                    >Cancel
                  </b-button>
                </b-form>
              </div>
            </div>
            <div v-for="quest in specificQuests" v-bind:key="quest._id">
              <quest-item
                v-bind:quest="quest"
                v-on:del-quest="deleteQuest"
                v-on:patch-quest="editQuest"
              />
            </div>
          </div>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import { Api } from '@/Api'
import QuestItem from '@/components/QuestItem.vue'
import ParentItem from '@/components/ParentItem.vue'
export default {
  beforeCreate: function () {
    document.body.className = 'parent-quest'
  },
  name: 'parent-quests',
  components: {
    QuestItem,
    ParentItem
  },
  mounted() {
    console.log('PAGE is loaded')
    Api.get('/parents')
      .then((response) => {
        this.parents = response.data.parents
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
      parents: [],
      name: '',
      quest_desc: '',
      money_bounty: '',
      value: '',
      selected: false,
      selectedId: '',
      selectedCreate: false,
      selectedEdit: false,
      questId: '',
      questDates: [],
      specificQuests: []
    }
  },
  methods: {
    deleteQuest(id) {
      Api.delete(`/quests/${id}`)
        .then((reponse) => {
          const index = this.quests.findIndex((quest) => quest._id === id)
          this.quests.splice(index, 1)
        })
        .catch((error) => {
          console.error(error)
        })
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
    getSpecificQuests() {
      var k = 0
      for (var i = 0; i < this.quests.length; i++) {
        if (this.quests[i].date === this.value + 'T00:00:00.000Z') {
          this.specificQuests[k] = this.quests[i]
          k++
        }
      }
    },
    patchQuest() {
      Api.patch(`/quests/${this.questId}`, {
        quest_name: this.name,
        quest_desc: this.quest_desc,
        money_bounty: this.money_bounty,
        date: this.value
      }).then((response) => {
        var quest = response.data
        const index = this.quests.findIndex((quest) => quest._id === this.questId)
        this.quests.splice(index, 1, quest)
      }).catch((error) => {
        console.error(error)
      })
      this.selectedEdit = false
      this.name = ''
      this.quest_desc = ''
      this.money_bounty = ''
    },
    editQuest(id) {
      if (this.selectedCreate) {
        this.selectedCreate = false
      }
      this.selectedEdit = true
      this.questId = id
    },
    createQuest() {
      Api.post('/quests', {
        quest_name: this.name,
        quest_desc: this.quest_desc,
        money_bounty: this.money_bounty,
        date: this.value,
        parent: this.selectedId
      }).then((response) => {
        var quest = response.data
        this.quests.push(quest)
      }).catch((error) => {
        console.error(error)
      })
      this.selectedCreate = false
      this.name = ''
      this.quest_desc = ''
      this.money_bounty = ''
    },
    cancelCreate() {
      this.selectedCreate = false
      this.name = ''
      this.quest_desc = ''
      this.money_bounty = ''
    },
    cancelEdit() {
      this.selectedEdit = false
      this.name = ''
      this.quest_desc = ''
      this.money_bounty = ''
    },
    getQuests(id) {
      if (this.selectedId === id) {
        this.selected = false
        this.selectedId = ''
      } else {
        this.selected = true
        this.selectedId = id
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
      }
      this.specificQuests = []
    }
  }
}
</script>

<style>
.parent-quest {
  background-color: rgb(44, 42, 49);
}
.parent-quest .createQuestFormBox {
  background-color: rgb(82, 71, 36);
  color: rgba(247, 210, 2, 0.75);
  padding: 15px;
  border: solid;
  border-radius: 20px;
}
.parent-quest .createQuestBtn {
  margin-bottom: 10px;
}
.parent-quest .completeQuest {
  display: none;
}
.parent-quest .showChildren,
.parent-quest .deleteParent,
.parent-quest .editParent,
.parent-quest .showRewards {
  display: none;
}
</style>
