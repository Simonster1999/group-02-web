import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ParentQuests from './views/ParentQuests.vue'
import ChildReward from './views/ChildReward.vue'
import ParentReward from './views/ParentReward.vue'
import ChildQuests from './views/ChildQuests.vue'
import Parent from './views/Parent.vue'

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
    },
    {
      path: '/rewards',
      name: 'Child Reward',
      component: ChildReward
    },
    {
      path: '/manage-rewards',
      name: 'Parent Reward',
      component: ParentReward
    },
    {
      path: '/parent',
      name: 'parent',
      component: Parent
    }
  ]
})
