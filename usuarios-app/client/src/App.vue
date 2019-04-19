<template>
  <div id="app">
    <usuario/>
  </div>
</template>

<script>

import Usuario from './views/usuario/index';

export default {
  name: 'App',
  components: {
    Usuario
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
</style>
