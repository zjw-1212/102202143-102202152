import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import ProjectDetail from './components/ProjectDetail.vue';
import MyProjects from './components/MyProjects.vue';
import ProjectManagement from './components/ProjectManagement.vue';
import Collaboration from './components/Collaboration.vue';
import MyProfile from './components/MyProfile.vue';
import Chat from './components/Chat.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/project/:id', component: ProjectDetail },
  { path: '/my-projects', component: MyProjects },
  { path: '/project-management', component: ProjectManagement },
  { path: '/collaboration', component: Collaboration },
  { path: '/profile', component: MyProfile },
  { path: '/chat/:projectId', component: Chat },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
