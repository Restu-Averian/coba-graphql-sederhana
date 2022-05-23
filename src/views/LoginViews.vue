<template>
  <div class="container">
    <h1>Login</h1>
    <form action="" @submit.prevent="login">
      <input type="text" placeholder="username" v-model="username" />
      <input type="password" placeholder="password" v-model="password" />
      <input type="submit" name="" id="" />
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
const LOGIN = gql(`
query MyQuery($_eq: String = "", $_eq1: String = "") {
  user(where: {username: {_eq: $_eq}, password: {_eq: $_eq1}}) {
    username
    password
    isLogin
  }
}

`);
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      let hasil = await this.$apollo.query({
        query: LOGIN,
        variables: {
          _eq: this.username,
          _eq1: this.password,
        },
      });
      if (hasil.data.user.length === 0) {
        alert("data tidak tersedia");
      } else {
        this.$store.dispatch("setUser", {
          username: hasil.data.user[0].username,
          pass: hasil.data.user[0].password,
          udhLogin: true,
        });
        this.$router.push("/");
        alert("data  tersedia");
      }
      console.log("Hasil : ", hasil);
    },
  },
  mounted() {
    let user = localStorage.getItem("dataUser");
    if (user) {
      this.$router.push("/");
    }
    console.log("User:", user);
  },
};
</script>

<style>
</style>