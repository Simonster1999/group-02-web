<template>
  <div>
    <b-form @submit.prevent="onSubmit" autocomplete="off">
      <b-form-group
        id="input-group-1"
        label="Reward name"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="reward_name"
          required
          placeholder="Enter name of reward"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="reward_desc"
          placeholder="Enter description"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Price" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="price"
          type="number"
          required
          placeholder="Enter price"
        ></b-form-input>
      </b-form-group>
      <b-button variant="primary" type="submit">Update</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reward_name: '',
      reward_desc: '',
      price: null
    }
  },
  methods: {
    onSubmit() {
      this.$emit('updateReward', this.reward_name, this.reward_desc, this.price)
    }
  }
}
</script>
