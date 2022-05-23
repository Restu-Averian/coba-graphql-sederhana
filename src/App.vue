<template>
  <div id="app">
    isLogin: {{ udhLogin }}
    <nav>
      <router-link to="/">Home</router-link> |
      <div v-if="udhLogin">
        <!-- Kondisi kalau udh login -->
        <button @click="logOut">Logout</button>
      </div>
      <div v-else>
        <!-- kalauFalse -->
        <!-- Kalau blm login -->
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link> |
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    udhLogin() {
      return this.$store.state.todo.user.udhLogin;
    },
  },
  methods: {
    logOut() {
      let a = confirm("logout ?");
      if (a) {
        this.$store.dispatch("updateIsLogin", false);
        localStorage.removeItem("dataUser");
      }
      this.$router.push("/login");
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
