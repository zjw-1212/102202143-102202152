<template>
  <div id="app">
    <!-- 只有用户登录后才显示导航栏 -->
    <NavBar v-if="isLoggedIn" /> 

    <!-- 显示主内容 -->
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar
  },
  computed: {
    // 通过检查 localStorage 中的 token 来判断用户是否登录
    isLoggedIn() {
      return !!localStorage.getItem('token'); // 如果 token 存在，表示用户已登录
    }
  }
};
</script>

<style>
/* 可根据需求添加 App.vue 的样式 */
</style>
