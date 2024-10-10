<template>
  <div class="main-container" :style="{ backgroundColor: pageBackgroundColor }">
    <nav class="nav-bar">
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/my-projects" class="nav-link">我的项目</router-link>
      <router-link to="/project-management" class="nav-link">项目管理</router-link>
      <router-link to="/collaboration" class="nav-link">交流协作</router-link>
      <router-link to="/profile" class="nav-link">我</router-link>
    </nav>

    <header class="hero-section">
      <h1 class="hero-title">欢迎来到项目平台</h1>
      <p class="hero-subtitle">在这里，你可以浏览并参与各类项目。</p>
    </header>

    <section v-if="projects.length" class="projects-section">
      <h2 class="section-title">当前项目</h2>
      <div class="projects-grid">
        <div v-for="project in projects" :key="project._id" class="project-card" :style="{ backgroundColor: getRandomColor() }">
          <router-link :to="`/project/${project._id}`" class="project-link" :title="project.title + ': ' + project.description">
            <h3 class="project-title">{{ truncateText(project.title, 30) }}</h3>
            <p class="project-description">{{ truncateText(project.description, 50) }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <div v-else class="no-projects">
      <p>当前没有可显示的项目。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [],
      pageBackgroundColor: '#f0f4f8',
    };
  },
  async mounted() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login');
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
  methods: {
    getRandomColor() {
      const colors = ['#FFD700', '#FF6347', '#3CB371', '#87CEEB', '#FF69B4', '#BA55D3', '#4682B4'];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    truncateText(text, maxLength) {
      if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      } else {
        return text;
      }
    },
  },
};
</script>

<style scoped>
:root {
  --primary-color: #007bff;
  --nav-bar-color: #e6f2ff;
  --nav-link-color: #004080;
  --border-color: #b3d9ff;
}

.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.nav-bar {
  width: 100%;
  background-color: var(--nav-bar-color);
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-link {
  margin: 0 10px;
  color: var(--nav-link-color);
  text-decoration: none;
  font-size: 16px;
}

.nav-link:hover,
.router-link-active {
  color: #002040;
  background-color: #cce5ff;
}

.hero-section {
  text-align: center;
  background: linear-gradient(135deg, #007bff, #00c6ff);
  color: white;
  padding: 40px 20px;
  margin-bottom: 40px;
  border-radius: 8px;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.projects-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.project-card {
  padding: 20px;
  border-radius: 8px;
  color: white;
  transition: transform 0.3s;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-10px);
}

.project-link {
  text-decoration: none;
  color: inherit;
}

.project-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  white-space: normal; /* 允许换行 */
}

.project-description {
  font-size: 1rem;
  color: #f5f5f5;
  white-space: normal; /* 允许换行 */
}

.no-projects {
  text-align: center;
  color: #999;
  margin-top: 40px;
  font-size: 1.2rem;
}
</style>
