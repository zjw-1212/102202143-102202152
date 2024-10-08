<template>
  <div class="home">
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/my-projects">我的项目</router-link>
      <router-link to="/project-management">项目管理</router-link>
      <router-link to="/collaboration">交流协作</router-link>
      <router-link to="/profile">我</router-link>
    </nav>

    <div class="content">
      <router-view></router-view>
    </div>

    <div v-if="projects.length">
      <h2>项目列表</h2>
      <ul>
        <li v-for="project in projects" :key="project._id">
          <router-link :to="`/project/${project._id}`">{{ project.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [],
    };
  },
  async mounted() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login'); // 如果用户未登录，跳转到登录页
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/projects', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        this.projects = await response.json();
      } else {
        console.error('无法获取项目列表');
      }
    } catch (error) {
      console.error('请求项目列表时出错:', error);
    }
  },
};
</script>


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


