<template>
  <div>
    <b-form @submit.prevent="onSubmit" autocomplete="off">
      <b-form-group label="Username">
        <b-form-input
          v-model="username"
          required
          placeholder="Enter username"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Password">
        <b-form-input
          v-model="password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button variant="primary" type="submit">Login</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('loginParent', this.username, this.password)
      this.username = null
      this.password = null
    }
  }
}
</script>
