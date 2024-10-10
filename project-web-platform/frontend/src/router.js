import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import ProjectDetail from './components/ProjectDetail.vue';
import MyProjects from './components/MyProjects.vue';
import ProjectManagement from './components/ProjectManagement.vue';
import CreateProject from './components/CreateProject.vue';  // 创建项目页面
import EditProject from './components/EditProject.vue';  // 编辑项目页面
import Collaboration from './components/Collaboration.vue';
import MyProfile from './components/MyProfile.vue';
import Chat from './components/Chat.vue';

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } }, // 需要身份验证的页面
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/project/:id', component: ProjectDetail },
  { path: '/my-projects', component: MyProjects },
  { path: '/project-management', component: ProjectManagement },
  { path: '/create-project', component: CreateProject },  // 创建项目的路由
  { path: '/edit-project/:id', component: EditProject },  // 编辑项目的路由
  { path: '/collaboration', component: Collaboration },
  { path: '/profile', component: MyProfile },
  { path: '/chat/:projectId', component: Chat },
];

// 判断用户是否已登录
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // 如果token存在，则认为用户已登录
};


const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 添加全局导航守卫，检查用户的登录状态
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated()) {
    // 如果用户未登录，且目标页面需要身份验证，则重定向到登录页
    next('/login');
  } else {
    next(); // 否则，允许访问
  }
});

export default router;
