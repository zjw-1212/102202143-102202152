<template>
  <nav class="navbar">
    
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token'); // 移除 token
      this.$router.push('/login'); // 跳转到登录页面
    }
  }
};
</script>


<style scoped>

</style>
