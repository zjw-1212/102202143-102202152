<template>
  <div class="login">
    <h2>登录</h2>
    <form @submit.prevent="loginUser"> <!-- 将login改为loginUser -->
      <input v-model="email" type="email" placeholder="邮箱" required />
      <input v-model="password" type="password" placeholder="密码" required />
      <button type="submit">登录</button>
    </form>
    <router-link to="/register">没有账号？注册</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        const result = await response.json();
        if (response.ok) {
          // 登录成功后保存token到localStorage
          localStorage.setItem('token', result.token);
          alert('登录成功！');
          this.$router.push('/'); // 登录成功后重定向到首页
        } else {
          alert(`登录失败: ${result.message}`);
        }
      } catch (error) {
        console.error('登录请求失败', error);
        alert('登录请求失败，请检查网络连接');
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
}
</style>
