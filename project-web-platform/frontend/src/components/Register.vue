<template>
  <div class="register">
    <h2>注册</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="username">用户名</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="email">邮箱</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="major">专业</label>
        <input type="text" v-model="major" required />
      </div>
      <div>
        <label for="password">密码</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="confirmPassword">确认密码</label>
        <input type="password" v-model="confirmPassword" required />
      </div>
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      major: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    async registerUser() {
      // 检查两次输入的密码是否匹配
      if (this.password !== this.confirmPassword) {
        alert('两次密码输入不一致');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
            major: this.major,
          }),
        });

        // 检查后端响应
        const result = await response.json();
        console.log("Register response:", result); // 添加日志，查看注册请求返回的内容
        
        if (response.ok) {
          alert('注册成功！');
          this.$router.push('/login'); // 跳转到登录页面
        } else {
          alert(`注册失败: ${result.message}`);
        }
      } catch (error) {
        console.error('注册请求失败', error);
        alert('注册请求失败，请检查网络连接');
      }
    },
  },
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
}
</style>
