<template>
  <div class="create-project">
    <h2>发布新项目</h2>
    <form @submit.prevent="createProject">
      <input v-model="title" placeholder="项目标题" required />
      <textarea v-model="description" placeholder="项目描述" required></textarea>
      <input v-model="requirements" placeholder="项目要求" required />
      <button type="submit">发布项目</button>
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
  methods: {
    async createProject() {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
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
        alert('项目发布成功');
        this.$router.push('/project-management');
      } else {
        alert('项目发布失败');
      }
    }
  }
};
</script>

<style scoped>
/* 添加样式 */
</style>
