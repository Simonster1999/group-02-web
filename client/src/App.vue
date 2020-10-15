<template>
  <div id="app">
    <b-navbar class="navigator">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <b-navbar-nav>
      <li class="nav-item">
        <router-link to="parent-quests" class="nav-link">Manage Quests</router-link>
      </li>
      <li class="nav-item">
        <router-link to="parent-rewards" class="nav-link">Manage Rewards</router-link>
      </li>
      <li class="nav-item">
        <router-link to="child-quests" class="nav-link">Quests</router-link>
      </li>
      <li class="nav-item">
        <router-link to="rewards" class="nav-link">Rewards</router-link>
      </li>
      </b-navbar-nav>
    </b-navbar>
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
.navigator {
  text-align: center;
  background-image: linear-gradient(230deg, rgb(94, 85, 64), rgb(114, 85, 46));
  color: rgb(247, 210, 2, 0.748);
  border-top: solid;
  border-bottom: solid;
  padding-top: 0px;
  padding-bottom: 0px;
  vertical-align: center;
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
  background-image: linear-gradient(230deg, rgb(94, 85, 64), rgb(114, 85, 46));
  color: rgba(247, 210, 2, 0.748);
  padding: 5px;
  border: solid;
  border-radius: 5px;
}

body {
  background-image: linear-gradient(130deg, rgb(48, 85, 99), rgb(14, 50, 65));
  background-attachment: fixed;
}
.bold {
  font-weight: bold;
}

</style>
