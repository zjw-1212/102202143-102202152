<template>
  <div class="login">
    <h2>登录</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="邮箱" required />
      <input v-model="password" type="password" placeholder="密码" required />
      <button type="submit">登录</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <router-link to="/register">没有账号？点击注册</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.errorMessage = errorData.message;
          return;
        }

        // 假设这里存储JWT并设置用户状态
        this.$router.push('/'); // 登录成功后跳转到首页
      } catch (error) {
        this.errorMessage = '登录失败，请重试';
      }
    }
  }
};
</script>
