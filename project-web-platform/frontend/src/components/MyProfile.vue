<template>
  <div class="profile-container" :style="{ backgroundColor: pageBackgroundColor }">
    <h2 class="profile-title">用户信息</h2>
    <div v-if="user" class="user-info">
      <p><strong>用户名:</strong> {{ user.username }}</p>
      <p><strong>邮箱:</strong> {{ user.email }}</p>
      <p><strong>专业:</strong> {{ user.major }}</p>
      <button class="logout-button" @click="logout">退出登录</button>
    </div>
    <div v-else class="loading-message">
      <p>加载用户信息中,如已退出登录请重新登录...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      pageBackgroundColor: '#2a2d34', // 页面背景颜色
    };
  },
  async mounted() {
    await this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await fetch('http://localhost:3000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          this.user = await response.json();
        } else {
          console.error('无法获取用户信息');
        }
      } catch (error) {
        console.error('获取用户信息时出错：', error);
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
body {
  background-color: #2a2d34; /* 整体背景颜色设置为灰黑色 */
  margin: 0; /* 去掉默认边距 */
  height: 100vh; /* 使 body 高度填满视口 */
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 86vh; /* 使容器高度填满视口 */
  width: 95%; /* 宽度设置为 100% */
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: white; /* 设置背景为白色 */
}

.profile-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: white; /* 标题颜色 */
}

.user-info {
  width: 100%;
  text-align: center; /* 文本居中 */
  margin-bottom: 20px;
}

.user-info p {
  font-size: 1.1rem;
  margin: 8px 0;
  color: white; /* 信息颜色 */
}

.logout-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #0056b3; /* 悬停时的颜色 */
}

.loading-message {
  text-align: center;
  color: white; /* 加载消息颜色 */
  font-size: 1.2rem;
}
</style>
