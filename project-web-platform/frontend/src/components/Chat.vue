<template>
  <div class="chat-container">
    <h2>{{ project.title }}</h2>
    <div class="messages">
      <!-- 显示历史消息 -->
      <div
        v-for="message in messages"
        :key="message._id"
        :class="['message', message.userId === 'guest' ? 'sent' : 'received']"
      >
        <img class="avatar" :src="message.avatar" alt="用户头像" />
        <div class="message-content">
          <strong>{{ message.username }}:</strong> {{ message.text }}
          <span class="timestamp">({{ new Date(message.timestamp).toLocaleString() }})</span>
        </div>
      </div>
    </div>

    <!-- 消息输入框 -->
    <div class="message-input">
      <input v-model="newMessage" placeholder="输入消息" @keydown.enter="sendMessage" />
      <button @click="sendMessage">发送</button>
    </div>

    <!-- 返回协作项目列表 -->
    <router-link to="/collaboration" class="back-link">返回协作项目列表</router-link>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');

export default {
  data() {
    return {
      project: {},
      messages: [],
      newMessage: ''
    };
  },
  async mounted() {
    await this.loadProjectAndMessages();
    socket.on('receiveMessage', (message) => {
      this.messages.push(message);
    });
  },
  methods: {
    async loadProjectAndMessages() {
      const projectId = this.$route.params.projectId;
      try {
        const projectResponse = await fetch(`http://localhost:3000/api/projects/${projectId}`);
        this.project = await projectResponse.json();

        const messagesResponse = await fetch(`http://localhost:3000/api/projects/${projectId}/messages`);
        this.messages = await messagesResponse.json();

        socket.emit('joinProject', projectId);
      } catch (error) {
        console.error('加载项目和消息时出错：', error);
      }
    },
    sendMessage() {
      if (!this.newMessage.trim()) {
        alert('消息不能为空。');
        return;
      }

      const message = {
        userId: 'guest',
        username: '用户1',
        text: this.newMessage,
        timestamp: new Date().toISOString(),
        avatar: 'https://example.com/default-avatar.png' // 默认头像的 URL
      };

      socket.emit('sendMessage', {
        projectId: this.project._id,
        message: message
      });

      this.messages.push(message);
      this.newMessage = '';
    }
  }
};
</script>

<style scoped>
.chat-container {
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 800px;
  height: 600px;
  display: flex;
  flex-direction: column;
  margin: auto;
}

h2 {
  font-size: 1.5em;
  color: #333;
  text-align: center;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  background: #fff3cd; /* 淡黄色背景 */
}

.message {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}

.sent {
  justify-content: flex-end;
}

.received {
  justify-content: flex-start;
}

.message-content {
  max-width: 75%;
  padding: 10px;
  border-radius: 12px;
  margin-left: 10px;
  margin-right: 10px;
}

.sent .message-content {
  background: #d1e7dd;
}

.received .message-content {
  background: #f8d7da;
}

.timestamp {
  font-size: 0.8em;
  color: #888;
  display: block;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.message-input {
  display: flex;
  margin-top: auto;
}

.message-input input {
  flex-grow: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.message-input input:focus {
  border-color: #007BFF;
  outline: none;
}

.message-input button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #007BFF;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.message-input button:hover {
  background: #0056b3;
}

.back-link {
  text-align: center;
  display: block;
  margin-top: 10px;
  color: #007BFF;
}
</style>
