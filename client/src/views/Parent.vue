<template>
  <div>
    <b-container>
      <b-row>
        <!-- Box for parents -->
        <b-col>
          <h1>Parent</h1>
          <parent-item v-bind:parent="parent"
            v-on:del-parent="deleteParent"
            v-on:edit-parent="toggleEditParent"
            v-on:show-children="getChildren"
          />
          </b-col>
        <!-- Box for parents children (if selected) AND child update form -->
        <b-col>
          <!-- Box for child update form -->
          <div v-if="editChild" style="margin-top:50px">
            <h1>Update Child</h1>
            <p>Leave blank if unchanged</p>
            <UpdateChildForm v-on:updateChild="updateChild" />
          </div>
          <div v-if="viewChildren">
            <h1>Children</h1>
            <!-- Box for children (if selected) -->
            <div v-for="child in children" v-bind:key="child._id">
              <child-item v-bind:child="child"
                v-on:del-child="deleteChild"
                v-on:edit-child="toggleEditChild"
              />
            </div>
          </div>
        </b-col>
        <b-col>
          <!-- Box for child creation form (if parent selected) -->
          <div v-if="viewChildren" style="margin-top:50px">
            <h1>Create new Child</h1>
            <PostChildForm v-on:postChild="postChild" />
          </div>
          <!-- Box for parent update form (if parent selected) -->
          <div v-if="editParent" style="margin-top:50px">
            <h1>Update Parent</h1>
            <p>Leave blank if unchanged</p>
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
import PostChildForm from '@/components/PostChildForm.vue'
import UpdateParentForm from '@/components/UpdateParentForm.vue'
import UpdateChildForm from '@/components/UpdateChildForm.vue'
export default {
  beforeCreate: function () { document.body.className = 'parent' },
  name: 'home',
  components: {
    ParentItem,
    ChildItem,
    PostChildForm,
    UpdateParentForm,
    UpdateChildForm
  },
  mounted() {
    console.log('PAGE is loaded')
    var url = new URL(window.location.href)
    var id = url.searchParams.get('id')
    if (id === null) {
      alert('No id provided')
    } else {
      Api.get('/parents/' + id).then(response => {
        this.parent = response.data
      })
        .catch(error => {
          this.message = error.message
          console.error(error)
          this.children = []
        })
        .then(() => {
        })
    }
  },
  data() {
    return {
      message: 'none',
      parent: '',
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
    toggleEditParent(id) {
      this.parentId = id
      this.viewChildren = false
      this.editChild = false
      this.editParent = !this.editParent
    },
    updateParent(username, password) {
      if ((username === null || password === null) || (username === null && password === null)) {
        Api.patch('/parents/' + this.parentId,
          {
            username: username,
            password: password
          })
          .then(response => {
            const index = this.parents.findIndex(parent => parent._id === this.parentId)
            this.parents.splice(index, 1,
              {
                username: response.data.username,
                password: response.data.password
              })
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        Api.put('/parents/' + this.parentId,
          {
            username: username,
            password: password
          })
          .then(response => {
            const index = this.parents.findIndex(parent => parent._id === this.parentId)
            this.parents.splice(index, 1,
              {
                username: response.data.username,
                password: response.data.password
              })
          })
          .catch(error => {
            console.error(error)
          })
      }
      this.editParent = false
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
      Api.post('/parents/' + this.parentId + '/children',
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
    toggleEditChild(id) {
      this.childId = id
      this.editChild = !this.editChild
      this.editParent = false
    },
    updateChild(username, password, balance) {
      if (username === null || password === null || balance === null) {
        Api.patch('/children/' + this.childId,
          {
            username: username,
            password: password,
            balance: balance
          })
          .then((response) => {
            var child = response.data
            const index = this.children.findIndex((child) => child._id === this.childId)
            this.children.splice(index, 1, child)
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        Api.put('/children/' + this.childId,
          {
            username: username,
            password: password,
            balance: balance
          })
          .then(response => {
            const index = this.children.findIndex(child => child._id === this.childId)
            this.children.splice(index, 1,
              {
                username: response.data.username,
                password: response.data.password,
                balance: response.data.balance
              })
          })
          .catch(error => {
            console.error(error)
          })
      }
      this.editChild = false
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
        this.editChild = false
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

<style>
.parent .col {
  text-align: left;
}
.parent .showQuests, .parent .showRewards, .parent .login {
  display: none;
}
</style>
