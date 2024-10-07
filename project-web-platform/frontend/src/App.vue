<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar
  }
};
</script>

<style>
/* 全局样式 */
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>
