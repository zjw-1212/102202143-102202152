<template>
  <div class="my-projects" :style="{ backgroundColor: pageBackgroundColor }">
    <header class="hero-section">
      <h2>我的项目</h2>
    </header>
    <section v-if="projects.length" class="projects-section">
      <ul>
        <li
          v-for="project in projects"
          :key="project._id"
          class="project-card"
          :style="{ backgroundColor: getRandomColor() }"
        >
          <router-link
            :to="`/project/${project._id}`"
            class="project-link"
            :title="project.title + ': ' + project.description"
          >
            <h3>{{ truncateText(project.title, 30) }}</h3>
            <p>{{ truncateText(project.description, 50) }}</p>
            <button @click="leaveProject(project._id)">退出项目</button>
          </router-link>
        </li>
      </ul>
    </section>
    <div v-else class="no-projects">
      <p>您尚未加入任何项目</p>
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
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/users/my-projects', {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.projects = await response.json();
  },
  methods: {
    async leaveProject(projectId) {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/projects/${projectId}/leave`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        this.projects = this.projects.filter(project => project._id !== projectId);
        alert('成功退出项目');
      } else {
        alert('功能完善中，敬请期待...');
      }
    },
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
  --border-color: #b3d9ff;
}

.my-projects {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.hero-section {
  text-align: center;
  background: linear-gradient(135deg, #007bff, #00c6ff);
  color: white;
  padding: 40px 20px;
  margin-bottom: 20px; /* 调整与项目卡片的间隙 */
  border-radius: 8px;
}

.projects-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  padding: 20px;
  border-radius: 8px;
  color: white;
  transition: transform 0.3s;
  margin-bottom: 20px; /* 增加项目卡片之间的间隙 */
}

.project-card:hover {
  transform: translateY(-10px);
}

.project-link {
  text-decoration: none;
  color: inherit;
}

.project-link h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-link p {
  font-size: 1rem;
  color: #f5f5f5;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.no-projects {
  text-align: center;
  color: #999;
  margin-top: 40px;
  font-size: 1.2rem;
}
</style>
