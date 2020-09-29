<template>
  <div>
    <b-container>
      <b-row>
        <!-- Box for parents -->
        <b-col>
          <div v-for="parent in parents" v-bind:key="parent._id">
            <parent-item v-bind:parent="parent"
              v-on:del-parent="deleteParent"
              v-on:edit-parent="editParent"
              v-on:show-children="getChildren"
            />
          </div>
        </b-col>
        <!-- Box for parents children (if selected) AND child creation form -->
        <b-col>
          <!-- Box for child creation form -->
          <div v-if="selected">
            <PostChildForm v-on:postChild="postChild" />
            <!-- Box for parents children (if selected) -->
            <div v-for="child in children" v-bind:key="child._id">
              <child-item v-bind:child="child" v-on:del-child="deleteChild"/>
            </div>
          </div>
        </b-col>
        <!-- Box for parent creation form -->
        <b-col>
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
import ChildItem from '@/components/ChildItem.vue'
import PostParentForm from '@/components/PostParentForm.vue'
import PostChildForm from '@/components/PostChildForm.vue'
export default {
  beforeCreate: function () { document.body.className = 'home' },
  name: 'home',
  components: {
    ParentItem,
    ChildItem,
    PostChildForm,
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
    editParent(id) {},
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
    postChild(username, password, balance) {
      Api.post('/children',
        {
          username: username,
          password: password,
          balance: balance,
          parent: this.selectedId
        }).then(response => {
        var child = response.data
        this.children.push(child)
      })
        .catch(error => {
          console.error(error)
        })
    },
    editChild(id) {},
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

<style scoped>
.col {
  text-align: left;
}
</style>
