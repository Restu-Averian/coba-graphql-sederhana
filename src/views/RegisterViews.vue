<template>
  <div class="container">
    <h1>Register</h1>
    <form action="" @submit.prevent="register">
      <input type="text" placeholder="username" v-model="username" />
      <input type="password" placeholder="password" v-model="password" />
      <input type="submit" name="" id="" />
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
const AddUser = gql(`
mutation MyMutation($objects: [user_insert_input!] = {}) {
  insert_user(objects: $objects) {
    returning {
      password
      username
    }
  }
}

`);
const GET_USER = gql(
  `
  query MyQuery($_eq: String = "") {
  user(where: {username: {_eq: $_eq}}) {
    password
    username
  }
}

  `
);
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async register() {
      let hasilquery = await this.$apollo.query({
        query: GET_USER,
        variables: {
          _eq: this.username,
        },
      });
      if (this.username === hasilquery.data.user[0].username) {
        alert("udh ada username");
      } else {
        await this.$apollo.mutate({
          mutation: AddUser,
          variables: {
            objects: {
              username: this.username,
              password: this.password,
            },
          },
        });
      }
      console.log("hasil query : ", hasilquery);
    },
  },
  mounted() {
    let user = localStorage.getItem("dataUser");
    if (user) {
      this.$router.push("/");
    }
  },
};
</script>

<style>
</style>