<template>
  <div class="my-profile">
    <h2>我的个人信息</h2>
    <p><strong>用户名:</strong> {{ user.username }}</p>
    <p><strong>邮箱:</strong> {{ user.email }}</p>
    <p><strong>专业:</strong> {{ user.major }}</p>
    <p><strong>已完成项目数:</strong> {{ user.projectsCompleted }}</p>

    <label for="username">修改用户名</label>
    <input v-model="newUsername" type="text" placeholder="新用户名" />
    <button @click="updateUsername">保存修改</button>

    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      newUsername: ''
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/users/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    this.user = await response.json();
  },
  methods: {
    async updateUsername() {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: this.newUsername })
      });
      if (response.ok) {
        this.user.username = this.newUsername;
        alert('用户名更新成功');
      } else {
        alert('更新用户名失败');
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');  // 退出登录并跳转到登录页面
    }
  }
};
</script>

<style scoped>
/* 添加样式 */
</style>
