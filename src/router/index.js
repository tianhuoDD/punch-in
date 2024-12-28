import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 创建历史记录，用于路由导航
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/PunchIn',
      children: [
        {
          path: '/PunchIn',
          name: 'PunchIn',
          component: () => import('@/views/PunchIn/index.vue')
        },
        {
          path: '/PunchAdd',
          name: 'PunchAdd',
          component: () => import('@/views/PunchIn/PunchAdd.vue')
        },
        {
          path: '/RecordBills',
          name: 'RecordBills',
          component: () => import('@/views/RecordBills/index.vue')
        }
      ]
    }
  ]
})

export default router
