<template>
  <div class="project-management">
    <h2>项目管理</h2>
    <button @click="goToCreateProject">发布新项目</button>
    <ul>
      <li v-for="project in projects" :key="project._id">
        <router-link :to="`/project/${project._id}`">{{ project.title }}</router-link>
        <button @click="editProject(project._id)">修改</button>
        <button @click="deleteProject(project._id)">删除</button>
        <router-link :to="`/project/${project._id}/applications`">查看申请</router-link>
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
    const response = await fetch('http://localhost:3000/api/users/my-managed-projects', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    this.projects = await response.json();
  },
  methods: {
    goToCreateProject() {
      this.$router.push('/create-project');  // 跳转到发布项目页面
    },
    editProject(projectId) {
      this.$router.push(`/edit-project/${projectId}`);  // 跳转到修改项目页面
    },
    async deleteProject(projectId) {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        this.projects = this.projects.filter(project => project._id !== projectId);
        alert('项目删除成功');
      } else {
        alert('删除项目失败');
      }
    }
  }
};
</script>

<style scoped>
/* 添加样式 */
</style>
