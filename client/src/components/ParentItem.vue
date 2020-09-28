<template>
    <div>
      <p>Username: {{parent.username}}</p>
      <b-button variant="danger" v-on:click="$emit('del-parent', parent._id)">X</b-button>
    </div>
</template>

<script>
export default {
  name: 'parent-item',
  props: ['parent']
}
</script>
