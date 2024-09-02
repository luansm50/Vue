<!-- src/App.vue -->
<template>
  <div id="app">
    <LicitacoesList />
  </div>
</template>

<script>
import LicitacoesList from './components/LicitacoesList.vue';

export default {
  components: {
    LicitacoesList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
