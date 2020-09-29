<template>
  <div>
    <b-container>
      <b-row>
        <!-- Box for parents -->
        <b-col>
          <h1>Parents</h1>
          <div v-for="parent in parents" v-bind:key="parent._id">
            <parent-item v-bind:parent="parent"
              v-on:del-parent="deleteParent"
              v-on:edit-parent="toggleEditParent"
              v-on:show-children="getChildren"
            />
          </div>
        </b-col>
        <!-- Box for parents children (if selected) AND child creation form -->
        <b-col>
          <!-- Box for child creation form -->
          <div v-if="viewChildren">
            <h1>Children</h1>
            <!-- Box for parents children (if selected) -->
            <div v-for="child in children" v-bind:key="child._id">
              <child-item v-bind:child="child"
                v-on:del-child="deleteChild"
                v-on:edit-child="toggleEditChild"
              />
            </div>
          </div>
        </b-col>
        <!-- Box for parent creation form -->
        <b-col>
          <h1>Create new Parent</h1>
          <PostParentForm v-on:postParent="postParent" />
          <div v-if="viewChildren" style="margin-top:50px">
            <h1>Create new Child</h1>
            <PostChildForm v-on:postChild="postChild" />
          </div>
          <div v-if="editParent" style="margin-top:50px">
            <h1>Update Parent</h1>
            <UpdateParentForm v-on:updateParent="updateParent" />
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
import PostParentForm from '@/components/PostParentForm.vue'
import PostChildForm from '@/components/PostChildForm.vue'
import UpdateParentForm from '@/components/UpdateParentForm.vue'
export default {
  beforeCreate: function () { document.body.className = 'home' },
  name: 'home',
  components: {
    ParentItem,
    ChildItem,
    PostChildForm,
    PostParentForm,
    UpdateParentForm

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
      viewChildren: false,
      parentId: '',
      childId: '',
      editChild: false,
      editParent: false
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
    toggleEditParent(id) {
      this.parentId = id
      this.viewChildren = false
      this.editChild = false
      this.editParent = !this.editParent
    },
    updateParent(username, password) {
      if (username === null || password === null) {
        alert('patch')
      } else {
        alert('put')
      }
    },
    deleteParent(id) {
      Api.delete(`/parents/${id}`)
        .then(reponse => {
          const index = this.parents.findIndex(parent => parent._id === id)
          this.parents.splice(index, 1)
          if (this.parentId === id) {
            this.children = []
            this.parentId = ''
          }
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
          parent: this.parentId
        }).then(response => {
        var child = response.data
        this.children.push(child)
      })
        .catch(error => {
          console.error(error)
        })
    },
    toggleEditChild(id) {},
    updateChild(id) {
      alert('child')
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
      if (this.parentId === id && this.viewChildren) {
        this.viewChildren = false
        this.parentId = ''
        this.children = []
      } else {
        this.viewChildren = true
        this.editChild = false
        this.editParent = false
        this.parentId = id
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
