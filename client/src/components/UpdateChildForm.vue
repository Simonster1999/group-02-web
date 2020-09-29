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

      <b-form-group id="input-group-3" label="Balance" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="balance"
          type="number"
          placeholder="Enter balance"
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
      password: null,
      balance: null
    }
  },
  methods: {
    onSubmit() {
      this.$emit('updateChild', this.username, this.password, this.balance)
    }
  }
}
</script>
