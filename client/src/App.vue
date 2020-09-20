<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark nav_color justify-content-between">
      <div class="container">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="/"><strong> Collector Tracker</strong></a>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 ">
          <li class="nav-item active">
            <!--<a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>-->
          </li>
          <li class="nav-item active">
            <a class="nav-link" v-if="$auth.isAuthenticated" href="/collections">My Collection <span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <div v-if="!$auth.loading">
          <button v-if="!$auth.isAuthenticated" @click="login" type="button" class="btn btn-light">Sign in</button>
          <button v-if="$auth.isAuthenticated" @click="logout" type="button" class="btn btn-danger">Log out</button>
        </div>
        
      </div>
      </div>
    </nav>
    
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {},
  methods:{
    login(){
      this.$auth.loginWithRedirect();
    },
    logout(){
      this.$auth.logout({
        returnTo: window.location.origin
      })
    }
  }
}
</script>

<style>
  .nav_color{
    background: #0f0c29;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
