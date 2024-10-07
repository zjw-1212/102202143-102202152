<template>
  <div class="register">
    <h2>注册</h2>
    <form @submit.prevent="register">
      <input v-model="username" type="text" placeholder="用户名" required />
      <input v-model="email" type="email" placeholder="邮箱" required />
      <input v-model="password" type="password" placeholder="密码" required />
      <input v-model="major" type="text" placeholder="专业" required />
      <button type="submit">注册</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <router-link to="/login">已有账号？点击登录</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      major: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
            major: this.major
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.errorMessage = errorData.message;
          return;
        }

        this.$router.push('/login'); // 跳转到登录页面
      } catch (error) {
        this.errorMessage = '注册失败，请重试';
      }
    }
  }
};
</script>
