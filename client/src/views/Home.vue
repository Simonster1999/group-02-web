<template>
  <div>
    <quest-item/>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import QuestItem from '@/components/QuestItem.vue'
export default {
  beforeCreate: function () { document.body.className = 'home' },
  name: 'home',
  components: {
    QuestItem
  },
  data() {
    return {
      message: 'none'
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
    }
  }
}
</script>

<style>
#b-jumbotron  {
  background-color: brown;
}
</style>
