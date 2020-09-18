<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"> El home </router-link>
      <router-link to="/collections"> El collections </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
//import Home from './components/Home.vue'

export default {
  name: 'App',
  /*components: {
    Home
  }*/
}
</script>

<style>

</style>
