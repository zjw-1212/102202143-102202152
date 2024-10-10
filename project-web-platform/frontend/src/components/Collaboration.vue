<template>
  <div class="collaboration">
    <div class="header">
      <h2 class="title">交流协作</h2>
      <p class="description">欢迎来到交流协作页，点击项目标题进入聊天界面，与其他成员实时交流，和项目成员一起愉快地交流吧！</p>
    </div>
    <div v-if="loading" class="loading">
      <i class="ri-loader-line ri-spin"></i> 加载中...
    </div>
    <div v-if="!loading && projects.length > 0" class="project-cards">
      <div
        v-for="project in projects"
        :key="project._id"
        class="project-card"
        @mouseenter="highlightProject(project._id)"
        @mouseleave="removeHighlight(project._id)"
      >
        <router-link :to="`/chat/${project._id}`" class="project-link">
          <i class="ri-folder-line project-icon"></i>
          <h3 class="project-title">{{ project.title }}</h3>
        </router-link>
      </div>
    </div>
    <p v-if="!loading && projects.length === 0" class="error-message">
      您尚未加入任何项目，无法与项目成员交流协作
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [],
      highlightedProjectId: null,
      loading: true // 加载状态
    };
  },
  async mounted() {
    try {
      await this.loadProjects();
    } catch (error) {
      console.error('加载协作项目列表时出错：', error);
      this.projects = [];
    } finally {
      this.loading = false; // 完成加载
    }
  },
  methods: {
    async loadProjects() {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/api/users/my-managed-projects', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          this.projects = await response.json();
        } else {
          throw new Error('无法获取协作项目列表');
        }
      } catch (error) {
        throw error;
      }
    },
    highlightProject(projectId) {
      this.highlightedProjectId = projectId;
    },
    removeHighlight(projectId) {
      if (this.highlightedProjectId === projectId) {
        this.highlightedProjectId = null;
      }
    }
  }
};
</script>

<style scoped>
.collaboration {
  max-width: 900px;
  margin: auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.header {
  background-color: #e0f7fa; /* 淡蓝色背景 */
  padding: 20px;
  border-radius: 12px 12px 0 0; /* 上部圆角 */
  text-align: center; /* 内容居中 */
}

.title {
  font-size: 2.2em;
  margin-bottom: 10px;
  color: #2c3e50;
}

.description {
  font-size: 1em;
  color: #7f8c8d;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  font-size: 1.5em;
  color: #3498db;
  margin: 25px 0;
}

.project-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.project-card {
  background: linear-gradient(to bottom, rgba(255, 235, 59, 0.9), rgba(255, 244, 196, 0.9)); /* 淡黄色渐变背景 */
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.project-link {
  text-decoration: none;
  color: #000000; /* 链接颜色设置为黑色 */
  text-align: center;
}

.project-icon {
  font-size: 48px; /* 图标大小 */
  color: #000000; /* 图标颜色 */
  margin-bottom: 10px;
}

.project-title {
  font-size: 1.4em;
  margin: 0;
  text-align: center;
  font-weight: bold;
  color: #000000; /* 标题颜色设置为黑色 */
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 30px;
  font-size: 1.2em;
}
</style>
