<template>
  <div>
    <b-container>
      <b-row>
        <!-- Box for parents -->
        <b-col>
          <div v-for="parent in parents" v-bind:key="parent._id" v-on:click="getChildren(parent._id)">
            <parent-item v-bind:parent="parent" v-on:del-parent="deleteParent"/>
          </div>
        </b-col>
        <!-- Box for parents children (if selected) AND child creation form -->
        <b-col v-if="selected">
          <!-- Box for child creation form -->
          <div>
            <b-form @submit.prevent="postChild">
              <b-form-group
                id="input-group-1"
                label="Your Username"
                label-for="input-1"
                description="Your username must be unique"
              >
                <b-form-input
                  id="input-1"
                  v-model="c_username"
                  required
                  placeholder="Enter username"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Your Password" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="c_password"
                  type="password"
                  required
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-3" label="Your Balance" label-for="input-3">
                <b-form-input
                  id="input-3"
                  v-model="balance"
                  type="number"
                  required
                  placeholder="Enter balance"
                ></b-form-input>
              </b-form-group>
              <b-button variant="primary" type="submit">Create</b-button>
            </b-form>
          </div>
          <!-- Box for parents children (if selected) -->
          <div v-for="child in children" v-bind:key="child._id">
            <child-item v-bind:child="child" v-on:del-child="deleteChild"/>
          </div>
        </b-col>
        <!-- Box for parent creation form -->
        <b-col>
          <div>
            <b-form @submit.prevent="postParent">
              <b-form-group
                id="input-group-1"
                label="Your Username"
                label-for="input-1"
                description="Your username must be unique"
              >
                <b-form-input
                  id="input-1"
                  v-model="p_username"
                  required
                  placeholder="Enter username"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Your Password" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="p_password"
                  type="password"
                  required
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>
              <b-button variant="primary" type="submit">Create</b-button>
            </b-form>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import ParentItem from '@/components/ParentItem.vue'
import ChildItem from '@/components/ChildItem.vue'
export default {
  beforeCreate: function () { document.body.className = 'home' },
  name: 'home',
  components: {
    ParentItem,
    ChildItem
  },
  mounted() {
    console.log('PAGE is loaded')
    Api.get('/parents').then(response => {
      this.parents = response.data.parents
    })
      .catch(error => {
        this.message = error.message
        console.error(error)
        this.children = []
      })
      .then(() => {
      })
  },
  data() {
    return {
      message: 'none',
      parents: [],
      children: [],
      c_username: '',
      c_password: '',
      balance: '',
      p_username: '',
      p_password: '',
      selected: false,
      selectedId: ''
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
    postParent() {
      Api.post('/parents',
        {
          username: this.p_username,
          password: this.p_password
        }).then(response => {
        var parent = response.data
        this.parents.push(parent)
      })
        .catch(error => {
          console.error(error)
        })
    },
    postChild() {
      Api.post('/children',
        {
          username: this.c_username,
          password: this.c_password,
          balance: this.balance,
          parent: this.selectedId
        }).then(response => {
        var child = response.data
        this.children.push(child)
      })
        .catch(error => {
          console.error(error)
        })
    },
    deleteParent(id) {
      Api.delete(`/parents/${id}`)
        .then(reponse => {
          const index = this.parents.findIndex(parent => parent._id === id)
          this.parents.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
    },
    deleteChild(id) {
      Api.delete(`/children/${id}`)
        .then(reponse => {
          const index = this.children.findIndex(child => child._id === id)
          this.children.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
    },
    getChildren(id) {
      if (this.selectedId === id) {
        this.selected = false
        this.selectedId = ''
      } else {
        this.selected = true
        this.selectedId = id
        Api.get('/parents/' + id + '/children').then(response => {
          this.children = response.data.children
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

<style>
#b-jumbotron  {
  background-color: brown;
}
.col {
  text-align: left;
}
</style>
