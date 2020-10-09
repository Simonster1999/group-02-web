<template>
  <div>
    <b-container>
      <b-row>
        <!-- Box for parents -->
        <b-col>
          <h1>Parents</h1>
          <div v-for="parent in parents" v-bind:key="parent._id">
            <parent-item v-bind:parent="parent" v-on:login-parent="login" />
          </div>
          <b-button class="deleteParent" variant="danger" v-on:click="deleteAllParents">Delete All Parents</b-button>
        </b-col>
        <b-col>
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
export default {
  beforeCreate: function () { document.body.className = 'home' },
  name: 'home',
  components: {
    ParentItem,
    PostParentForm
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
      parents: [],
      parentId: ''
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
    login(password, id) {
      var userPass = prompt('Password')
      if (userPass === password) {
        this.$router.push({ path: 'parent', query: { id: id } })
      } else {
        alert('Incorrect password')
      }
    }
  }
}
</script>

<style>
.home .col {
  text-align: left;
}
.home .showQuests, .home .showRewards, .home .deleteParent, .home .editParent, .home .showChildren {
  display: none;
}
</style>
