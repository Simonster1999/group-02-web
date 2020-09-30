import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ParentQuests from './views/ParentQuests.vue'
import ChildQuests from './views/ChildQuests.vue'

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
      path: '/parent-quests',
      name: 'parent-quests',
      component: ParentQuests
    },
    {
      path: '/child-quests',
      name: 'child-quests',
      component: ChildQuests
    }
  ]
})
