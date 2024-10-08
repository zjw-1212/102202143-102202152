<template>
  <div class="project-management">
    <h2>项目管理</h2>
    <button @click="goToCreateProject">发布新项目</button>
    <ul v-if="projects.length > 0">
      <li v-for="project in projects" :key="project._id">
        <router-link :to="`/project/${project._id}`">{{ project.title }}</router-link>
        <button @click="editProject(project._id)">修改</button>
        <button @click="deleteProject(project._id)">删除</button>
        <router-link :to="`/project/${project._id}/applications`">查看申请</router-link>
      </li>
    </ul>
    <div v-else>
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
    async deleteProject(projectId) {
      const token = localStorage.getItem('token');
      const confirmation = confirm('确定要删除该项目吗？');  // 提示确认
      if (!confirmation) return;  // 如果用户取消，终止操作

      try {
        const response = await fetch(`http://localhost:3000/api/projects/${projectId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          this.projects = this.projects.filter(project => project._id !== projectId);
          alert('项目删除成功');
        } else {
          alert('删除项目失败');
        }
      } catch (error) {
        console.error('删除项目时出现错误:', error);
        alert('删除项目失败，请稍后再试');
      }
    }
  }
};
</script>

<style scoped>
.project-management {
  padding: 20px;
}

h2 {
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  color: #777;
}
</style>
