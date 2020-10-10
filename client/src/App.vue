<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="parent-quests">Manage Quests</router-link> |
      <router-link to="parent-rewards">Manage Rewards</router-link> |
      <router-link to="child-quests">Quests</router-link> |
      <router-link to="rewards">Rewards</router-link>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  text-align: center;
}

html, body {
  height: 100%;
}
</style>
