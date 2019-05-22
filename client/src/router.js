import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/ask',
      name: 'ask',
      component: () => import(/* webpackChunkName: "ask" */ './views/NewPost.vue')
    },
    {
      path: '/question/:questionId',
      name: 'question',
      component: () => import(/* webpackChunkName: "question" */ './views/Question.vue')      
    },
    {
      path: '/question/:questionId/edit',
      name: 'edit',
      component: () => import(/* webpackChunkName: "question" */ './views/NewPost.vue')      
    },

  ]
})
