<template>
  <div>
    <b-container>
      <b-row class="text-left">
        <!-- Box for parents -->
        <b-col cols="12" offset-xs="0" sm="10" offset-sm="1" md="4" offset-md="0">
          <h1>Parents</h1>
          <div v-for="parent in parents" v-bind:key="parent._id">
            <parent-item v-bind:parent="parent" />
          </div>
          <b-button variant="danger" v-on:click="deleteAllParents">Delete All Parents</b-button>
        </b-col>
        <b-col cols="12" offset-xs="0" sm="10" offset-sm="1" md="4" offset-md="0">
          <h1>Login</h1>
          <ParentLoginForm v-on:loginParent="login"/>
        </b-col>
        <b-col cols="12" offset-xs="0" sm="10" offset-sm="1" md="4" offset-md="0">
          <!-- Box for parent creation form -->
          <h1>Create new Parent</h1>
          <PostParentForm v-on:postParent="postParent" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import ParentItem from '@/components/ParentItem.vue'
import PostParentForm from '@/components/PostParentForm.vue'
import ParentLoginForm from '@/components/ParentLoginForm.vue'
export default {
  beforeCreate: function () { document.body.className = 'home' },
  name: 'home',
  components: {
    ParentItem,
    PostParentForm,
    ParentLoginForm
  },
  mounted() {
    console.log('PAGE is loaded')
    Api.get('/parents').then(response => {
      this.parents = response.data.parents
    })
      .catch(error => {
        this.message = error.message
        console.error(error)
      })
      .then(() => {
      })
  },
  data() {
    return {
      message: 'none',
      parents: []
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
    postParent(username, password) {
      Api.post('/parents',
        {
          username: username,
          password: password
        }).then(response => {
        var parent = response.data
        this.parents.push(parent)
      })
        .catch(error => {
          console.error(error)
        })
    },
    deleteAllParents() {
      if (confirm('Are you sure you want to delete everything?')) {
        Api.delete('/parents')
          .then(reponse => {})
          .catch(error => {
            console.error(error)
          })
        this.parents = []
      }
    },
    login(username, password) {
      Api.get('/parents/login/' + username + '/' + password)
        .then(response => {
          if (response.data.status === true) {
            this.$router.push({ path: 'parent', query: { id: response.data.id } })
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
}
</script>

<style>
.home .text-left {
  text-align: left;
}
.home .showQuests, .home .showRewards, .home .deleteParent, .home .editParent, .home .showChildren {
  display: none;
}
</style>
