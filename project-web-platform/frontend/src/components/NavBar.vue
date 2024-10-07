<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/my-projects">我的项目</router-link></li>
      <li><router-link to="/project-management">项目管理</router-link></li>
      <li><router-link to="/collaboration">交流协作</router-link></li>
      <li><router-link to="/profile">我的</router-link></li>
      <li><a href="#" @click="logout">退出登录</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      this.$router.push('/login'); // 退出登录并跳转到登录页面
    }
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  right: 0;
  width: 15%;
  height: 100%;
  background-color: #333;
  padding: 20px;
}

.navbar ul {
  list-style-type: none;
  padding: 0;
}

.navbar ul li {
  margin-bottom: 20px;
}

.navbar ul li a {
  color: white;
  text-decoration: none;
}

.navbar ul li a:hover {
  color: #ccc;
}
</style>
