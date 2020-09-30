<template>
  <b-calendar class="border rounded p-4" v-model="value" selected-variant="danger" @context="onContext" locale="en-US" length="100px" width="700px" hide-header="hideHeader" />
</template>

<script>
export default {
  name: 'calendar',
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style>
.b-calendar {
  background-color:rgb(100, 79, 46);
}
</style>
