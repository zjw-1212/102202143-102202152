<template>
  <div class="home">
    <!-- 导航栏 -->
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/my-projects">我的项目</router-link> <!-- 修正路径中的空格 -->
      <router-link to="/project-management">项目管理</router-link> <!-- 修正路径中的空格 -->
      <router-link to="/collaboration">交流协作</router-link>
      <router-link to="/profile">我的</router-link>
    </nav>

    <!-- 主内容区域 -->
    <div class="content">
      <router-view></router-view> <!-- 修正 router-view -->
    </div>

    <!-- 项目列表 -->
    <div>
      <h2>项目列表</h2>
      <ul>
        <li v-for="project in projects" :key="project._id">
          <router-link :to="`/project/${project._id}`">{{ project.title }}</router-link> <!-- 修正 router-link -->
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* 导航栏和主内容布局 */
nav {
  width: 15%;
  float: left;
  background-color: #f4f4f4;
  padding: 10px;
}

nav a {
  display: block;
  margin: 10px 0;
  color: #333;
  text-decoration: none;
}

nav a:hover {
  color: #007bff;
}

.content {
  width: 85%;
  float: right;
}

h2 {
  margin-top: 20px;
  color: #333;
}
</style>

<script>
export default {
  data() {
    return {
      projects: [], // 初始化项目列表
    };
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:3000/api/projects', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // 确保添加授权头部
        },
      });

      // 检查请求是否成功
      if (response.ok) {
        this.projects = await response.json(); // 将项目列表保存到数据中
      } else {
        console.error('无法获取项目列表');
      }
    } catch (error) {
      console.error('请求项目列表时出现错误:', error);
    }
  },
};
</script>
