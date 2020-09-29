import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ParentQuests from './views/ParentQuests.vue'
import ChildReward from './views/ChildReward.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/quests',
      name: 'quests',
      component: ParentQuests
    },
    {
      path: '/rewards',
      name: 'rewards',
      component: ChildReward
    }
  ]
})
