<template>
  <div>
    <h2>{{ project.title }}</h2>
    <p>{{ project.description }}</p>
    <button v-if="!isMember" @click="applyForProject">申请加入项目</button>
    
    <!-- 显示申请表单 -->
    <div v-if="showForm">
      <h3>申请理由</h3>
      <textarea v-model="applicationMessage" placeholder="填写申请理由"></textarea>
      <button @click="submitApplication">提交申请</button>
    </div>

    <!-- 项目成员列表 -->
    <div v-if="isMember">
      <h3>项目成员</h3>
      <ul>
        <li v-for="member in project.members" :key="member._id">{{ member.username }}</li>
      </ul>
    </div>

    <!-- 返回项目列表 -->
    <router-link to="/my-projects">返回我的项目</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {},
      isMember: false,
      showForm: false,
      applicationMessage: ''
    };
  },
  async mounted() {
    const projectId = this.$route.params.id;
    const response = await fetch(`http://localhost:3000/api/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    this.project = await response.json();

    // 检查当前用户是否已经是项目成员
    const userId = localStorage.getItem('userId');
    this.isMember = this.project.members.some(member => member._id === userId);
  },
  methods: {
    applyForProject() {
      this.showForm = true;
    },
    async submitApplication() {
      const token = localStorage.getItem('token');
      const projectId = this.$route.params.id;
      const response = await fetch(`http://localhost:3000/api/projects/${projectId}/apply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: this.applicationMessage }),
      });
      const result = await response.json();
      if (result.success) {
        alert('申请提交成功，等待项目发布者审批');
        this.showForm = false;
      } else {
        alert(result.message);
      }
    }
  }
};
</script>

<style scoped>
/* 添加样式以确保页面美观 */
textarea {
  width: 100%;
  height: 100px;
}
</style>
