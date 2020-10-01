<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-sidebar no-header-close bg-variant="dark" visible="true">
            <h1>Child List</h1>
            <div v-for="child in children" v-bind:key="child._id">
              <child-item
                v-bind:child="child"
                v-on:show-quests="getQuests"
              />
            </div>
          </b-sidebar>
        </b-col>
        <b-col>
          <b-calendar
            class="calendar"
            v-model="value"
            selected-variant="danger"
            @context="value"
            locale="en-US"
            width="480px"
            :hide-header="true"
          />
        </b-col>
        <b-col>
          <div v-if="selected">
            <b-sidebar right bg-variant="dark" visible="true" no-header-close>
              <h1>Quest List</h1>
              <div v-for="quest in quests" v-bind:key="quest._id">
                <quest-item
                  v-bind:quest="quest"
                  v-on:complete-quest="completeQuest"
                />
              </div>
            </b-sidebar>
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
      selectedChildBalance: ''
    }
  },
  methods: {
    getQuests(id, childId, childBalance) {
      this.selectedChildId = childId
      this.selectedChildBalance = childBalance
      if (this.selectedParentId === id) {
        this.selected = false
        this.selectedParentId = ''
      } else {
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
      }
    },
    completeQuest(id, reward) {
      Api.patch(`/quests/${id}`, {
        is_completed: true,
        completed_by: this.selectedChildId
      }).catch(error => {
        console.error(error)
      })
      Api.patch('/children/' + this.selectedChildId,
        {
          balance: this.selectedChildBalance + reward
        }).then(response => {
        const index = this.children.findIndex(child => child._id === this.selectedChildId)
        var child = response.data
        this.children.splice(index, 1, child)
      })
      this.selectedChildBalance += reward
    }
  }
}
</script>

<style>
.child-quest {
  background-color: rgb(44, 42, 49);
}
.child-quest .delChild {
  display: none;
}
.child-quest .editChild {
  display: none;
}
.child-quest .childP {
  font-size: 1.5em;
}
.child-quest .delQuest {
  display: none;
}
.child-quest .editQuest {
  display: none;
}
.child-quest .showRewards {
  display: none;
}
.child-quest .createQuestFormBox {
  background-color: rgb(82, 71, 36);
  color: rgba(247, 210, 2, 0.748);
  padding: 15px;
  border: solid;
  border-radius: 20px;
}
.child-quest .childDiv {
  margin-bottom: 10px;
  padding: 10px;
  border: solid;
  border-color: rgb(84, 84, 84);
  border-radius: 20px;
  background-color: rgb(179, 181, 166);
}
.child-quest .createQuestBtn {
  margin-bottom: 10px;
}
.child-quest .calendar {
  background-color: rgb(82, 71, 36);
  color: rgba(247, 210, 2, 0.748);
  padding: 15px;
  border: solid;
  border-radius: 20px;
}
.child-quest .createQuestHeader {
  background-color: rgb(114, 85, 46);
  color: rgba(247, 210, 2, 0.748);
  padding: 5px;
  border: solid;
  border-radius: 5px;
  font-size: 1.2em;
}
.child-quest h1 {
  background-color: rgb(114, 85, 46);
  color: rgba(247, 210, 2, 0.748);
  padding: 5px;
  border: solid;
  border-radius: 5px;
}
</style>
