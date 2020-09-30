<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-sidebar
            no-header-close
            bg-variant="dark"
            visible="true">
            <h1>Parent List</h1>
            <div
              v-for="parent in parents"
              v-bind:key="parent._id">
              <parent-item
              v-bind:parent="parent"
              v-on:show-quests="getQuests"/>
            </div>
          </b-sidebar>
        </b-col>
        <b-col>
          <b-calendar value-as-date class="border rounded p-4" v-model="value" selected-variant="danger" @context="value" locale="en-US" width="480px" :hide-header="true"/>
        </b-col>
        <b-col>
          <div v-if="selected">
            <b-sidebar  right bg-variant="dark" visible="true" no-header-close >
              <b-col>
                <h1>Quest List</h1>
                <b-button variant="warning" v-on:click="selectedCreate= true">Create Quest</b-button>
              </b-col>
              <b-col v-if="selectedCreate">
                <div>
                <b-form autocomplete="off" >
                  <b-form-input v-model="name" placeholder="Enter quest name"></b-form-input>
                  <b-form-input  v-model="quest_desc" placeholder="Enter quest description"></b-form-input>
                  <b-form-input v-model="money_bounty" placeholder="Enter reward amount"></b-form-input>
                  <b-form-input v-model="value" placeholder="Select date"></b-form-input>
                  <b-button variant="light" v-on:click="createQuest">Add </b-button>
                  <b-button variant="warning" v-on:click="cancelCreate">Cancel </b-button>
                  </b-form>
                </div>
              </b-col>
        <div  v-for="quest in quests" v-bind:key="quest._id">
          <quest-item v-bind:quest="quest" v-on:del-quest="deleteQuest" v-on:put-quest="putQuest"/>
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
import ParentItem from '@/components/ParentItem.vue'
export default {
  beforeCreate: function () { document.body.className = 'parent-quest' },
  name: 'parent-quests',
  components: {
    QuestItem,
    ParentItem
  },
  mounted() {
    console.log('PAGE is loaded')
    Api.get('/parents').then(response => {
      this.parents = response.data.parents
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
      parents: [],
      name: '',
      quest_desc: '',
      money_bounty: '',
      value: '',
      selected: false,
      selectedId: '',
      selectedCreate: false
    }
  },
  methods: {
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
    putQuest(id) {
      Api.put(`/quests/${id}`,
        {
          quest_name: this.name,
          quest_desc: this.quest_desc,
          money_bounty: this.money_bounty,
          date: this.value
        })
    },
    createQuest() {
      Api.post('/quests',
        {
          quest_name: this.name,
          quest_desc: this.quest_desc,
          money_bounty: this.money_bounty,
          date: this.value,
          parent: this.selectedId
        }).then(response => {
        var quest = response.data
        this.quests.push(quest)
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
    getQuests(id) {
      if (this.selectedId === id) {
        this.selected = false
        this.selectedId = ''
      } else {
        this.selected = true
        this.selectedId = id
        Api.get('/parents/' + id + '/quests').then(response => {
          this.quests = response.data.quests
        })
          .catch(error => {
            this.message = error.message
            console.error(error)
            this.quests = []
          })
          .then(() => {
          })
      }
    }
  }
}

</script>

<style>
.parent-quest {
  background-color: rgb(82, 71, 36);
}
.parent-quest h1 {
background-color:rgb(114, 85, 46);
color:rgba(247, 210, 2, 0.748)
}
.parent-quest .showChildren {
  display: none;
}
.parent-quest .deleteParent {
  display: none;
}
.parent-quest .editParent {
  display: none;
}
</style>
