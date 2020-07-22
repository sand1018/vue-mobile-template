<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {setToken} from '@/utils/auth'
export default {
  async created(){
    console.log(this.$http)
    const {data:{userid,code}} =await this.$http.get('login_h5_pub',{})
    if (code == 1) {
      setToken(userid)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
