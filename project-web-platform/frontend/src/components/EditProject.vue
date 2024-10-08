<template>
  <div class="edit-project">
    <h2>修改项目</h2>
    <form @submit.prevent="editProject">
      <input v-model="title" placeholder="项目标题" required />
      <textarea v-model="description" placeholder="项目描述" required></textarea>
      <input v-model="requirements" placeholder="项目要求" required />
      <button type="submit">保存修改</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      requirements: ''
    };
  },
  async mounted() {
    const projectId = this.$route.params.id;
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000/api/projects/${projectId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const project = await response.json();
    this.title = project.title;
    this.description = project.description;
    this.requirements = project.requirements;
  },
  methods: {
    async editProject() {
      const projectId = this.$route.params.id;
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: this.title,
          description: this.description,
          requirements: this.requirements
        })
      });

      if (response.ok) {
        alert('项目修改成功');
        this.$router.push('/project-management');
      } else {
        alert('项目修改失败');
      }
    }
  }
};
</script>

<style scoped>
/* 添加样式 */
</style>
