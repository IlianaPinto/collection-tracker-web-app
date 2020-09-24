<template>
  <div class="profile">
      <div class="row">
          <div class="col text-center">
              <img :src="$auth.user.picture" alt="">
          </div>
          <div class="col">
              <h2 class=''>My Profile</h2>
              <br><br>
              <p>Nickname: {{$auth.user.nickname}}</p>
              <p>Email: {{$auth.user.email}}</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Profile',
    
}
</script>

<style>

</style>