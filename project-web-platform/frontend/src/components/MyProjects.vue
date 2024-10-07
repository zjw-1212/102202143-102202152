<template>
  <div class="my-projects">
    <h2>我的项目</h2>
    <ul>
      <li v-for="project in projects" :key="project._id">
        <router-link :to="`/project/${project._id}`">{{ project.title }}</router-link>
        <button @click="leaveProject(project._id)">退出项目</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: []
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/users/my-projects', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    this.projects = await response.json();
  },
  methods: {
    async leaveProject(projectId) {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/projects/${projectId}/leave`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        this.projects = this.projects.filter(project => project._id !== projectId);
        alert('成功退出项目');
      } else {
        alert('退出失败');
      }
    }
  }
};
</script>

<style scoped>
/* 添加样式 */
</style>
