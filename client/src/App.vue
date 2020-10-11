<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="parent-quests">Manage Quests</router-link> |
      <router-link to="manage-rewards">Manage Rewards</router-link> |
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
  color: rgb(211, 211, 211);
}
#nav {
  text-align: center;
}
.content-row {
  margin-top: 30px;
}
.col {
  padding-bottom: 25px;
}
html, body {
  height: 100%;
}
form {
  padding-bottom: 25px;
}
.calendar {
  background-color: rgb(82, 71, 36);
  color: rgba(247, 210, 2, 0.748);
  padding: 15px;
  border: solid;
  border-radius: 20px;
}
h1 {
  background-color: rgb(114, 85, 46);
  color: rgba(247, 210, 2, 0.748);
  padding: 5px;
  border: solid;
  border-radius: 5px;
}

@media only screen and (min-width: 768px) {
  body {
    background-image: linear-gradient(130deg, rgb(48, 85, 99), rgb(14, 50, 65));
  }
}

</style>
