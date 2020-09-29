<template>
  <div>
    <b-form @submit.prevent="onSubmit" autocomplete="off">
      <b-form-group
        id="input-group-1"
        label="Username"
        label-for="input-1"
        description="Your username must be unique"
      >
        <b-form-input
          id="input-1"
          v-model="username"
          placeholder="Enter username"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="password"
          type="password"
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button variant="primary" type="submit">Create</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    onSubmit() {
      this.$emit('updateParent', this.username, this.password)
    }
  }
}
</script>
