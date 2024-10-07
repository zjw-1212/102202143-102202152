<template>
  <div class="collaboration">
    <h2>交流协作</h2>
    <ul>
      <li v-for="project in projects" :key="project._id">
        <router-link :to="`/chat/${project._id}`">{{ project.title }}</router-link>  <!-- 点击进入群聊页面 -->
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
    const response = await fetch('http://localhost:3000/api/users/my-collaborations', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    this.projects = await response.json();
  }
};
</script>

<style scoped>
/* 添加样式 */
</style>
