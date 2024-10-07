<template>
  <div class="chat-container">
    <h2>{{ project.title }} - 群聊</h2>
    <div class="messages">
      <!-- 显示历史消息 -->
      <div v-for="message in messages" :key="message._id" class="message">
        <strong>{{ message.username }}:</strong> {{ message.text }} ({{ new Date(message.timestamp).toLocaleString() }})
      </div>
    </div>

    <!-- 消息输入框 -->
    <div class="message-input">
      <input v-model="newMessage" placeholder="输入消息" @keydown.enter="sendMessage" />
      <button @click="sendMessage">发送</button>
    </div>

    <!-- 返回协作项目列表 -->
    <router-link to="/collaboration">返回协作项目列表</router-link>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000', {
  withCredentials: true  // 确保携带凭证
});

export default {
  data() {
    return {
      project: {},
      messages: [],
      newMessage: ''
    };
  },
  async mounted() {
    const projectId = this.$route.params.projectId;

    // 获取项目的详细信息
    const projectResponse = await fetch(`http://localhost:3000/api/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    this.project = await projectResponse.json();

    // 加入项目聊天室
    socket.emit('joinProject', projectId);

    // 加载历史消息
    const messagesResponse = await fetch(`http://localhost:3000/api/projects/${projectId}/messages`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    this.messages = await messagesResponse.json();

    // 实时接收新消息
    socket.on('receiveMessage', (message) => {
      this.messages.push(message);
    });
  },
  methods: {
    async sendMessage() {
      const message = {
        userId: localStorage.getItem('userId'),
        username: localStorage.getItem('username'),
        text: this.newMessage
      };

      // 发送消息给 WebSocket 服务器
      socket.emit('sendMessage', {
        projectId: this.project._id,
        message
      });

      this.newMessage = '';  // 清空输入框
    }
  }
};
</script>

<style scoped>
.chat-container {
  padding: 20px;
}

.messages {
  max-height: 400px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.message-input {
  display: flex;
}

.message-input input {
  flex-grow: 1;
  padding: 10px;
  margin-right: 10px;
}

.message-input button {
  padding: 10px;
}
</style>
