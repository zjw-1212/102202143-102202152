<template>
  <div class="project-management">
    <h2>项目管理</h2>
    <button @click="goToCreateProject" class="create-button">发布新项目</button>

    <div v-if="projects.length > 0" class="project-list">
      <div class="project-card" v-for="project in projects" :key="project._id">
        <div class="project-info">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
        </div>
        <div class="project-actions">
          <router-link :to="`/project/${project._id}`" class="view-button">查看详情</router-link>
          <button @click="editProject(project._id)" class="edit-button">修改</button>
          <button @click="showUnimplementedMessage" class="delete-button">删除</button>
        </div>
      </div>
    </div>

    <div v-else class="no-projects">
      <p>当前没有管理的项目。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [],  // 项目列表
      errorMessage: ''  // 错误信息
    };
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/users/my-managed-projects', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        this.projects = await response.json();
      } else {
        this.errorMessage = '无法获取管理的项目';
      }
    } catch (error) {
      console.error('获取管理的项目时出现错误:', error);
      this.errorMessage = '请求失败，请稍后再试';
    }
  },
  methods: {
    goToCreateProject() {
      this.$router.push('/create-project');  // 跳转到发布项目页面
    },
    editProject(projectId) {
      this.$router.push(`/edit-project/${projectId}`);  // 跳转到修改项目页面
    },
    showUnimplementedMessage() {
      alert('功能尚未完善');
    }
  }
};
</script>

<style scoped>
.project-management {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #333;
  text-align: center;
}

.create-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.create-button:hover {
  background-color: #0056b3;
}

.project-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.project-card {
  background: linear-gradient(135deg, #66b2ff, #99ccff); /* 更浅的渐变蓝色 */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: white; /* 字体颜色为白色 */
}

.project-info h3 {
  margin: 0;
  font-size: 18px;
}

.project-info p {
  font-size: 14px;
}

.project-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.project-actions.view-button,
.project-actions.edit-button,
.project-actions.delete-button,
.project-actions.applications-button {
  background-color: rgba(255, 255, 255, 0.2); /* 半透明按钮 */
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.project-actions.edit-button {
  background-color: rgba(40, 167, 69, 0.7); /* 半透明绿色 */
}

.project-actions.delete-button {
  background-color: rgba(220, 53, 69, 0.7); /* 半透明红色 */
}

.project-actions button:hover {
  opacity: 0.8;
}

.no-projects {
  text-align: center;
  color: #666;
}
</style>
