<template>
  <div class="container">
    <h1>Todo</h1>
    <p>Login sebagai {{ dataUser.todo.user.username }}</p>
    <input type="text" v-model="todo" @keyup.enter="add" />
    <ul>
      <li v-for="(todo, index) in todoList.todo" :key="index">
        {{ todo.id }} {{ todo.todo }} - {{ todo.username }}
        <span style="color: red; cursor: pointer" @click="deleteTodo(todo.id)"
          >Hapus</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
import gql from "graphql-tag";
const ADD_TODO = gql(`
mutation MyMutation($todo: String = "", $username: String = "") {
  insert_todo(objects: {todo: $todo, username: $username}) {
    returning {
      id
      todo
      username
    }
  }
}

`);
// const GET_TODO = gql(
//   `
// subscription MySubscription {
//   todo {
//     id
//     todo
//     username
//   }
// }
//   `
// );
const deleteTodo = gql(`
mutation MyMutation($_eq: Int = 10) {
  delete_todo(where: {id: {_eq: $_eq}}) {
    returning {
      id
      todo
      username
    }
  }
}

`);

export default {
  data() {
    return {
      todo: "",
      todoList: [],
    };
  },
  apollo: {
    $subscribe: {
      todoList: {
        query: gql`
          subscription MySubscription($_eq: String = "") {
            todo(where: { username: { _eq: $_eq } }) {
              id
              todo
              username
            }
          }
        `,
        variables() {
          // This works just like regular queries
          // and will re-subscribe with the right variables
          // each time the values change
          return {
            _eq: this.dataUser.todo.user.username,
          };
        },
        result({ data }) {
          this.todoList = data;
        },
      },
    },
  },
  methods: {
    add() {
      this.$apollo.mutate({
        mutation: ADD_TODO,
        variables: {
          todo: this.todo,
          username: this.dataUser.todo.user.username,
        },
      });
      this.todo = "";
    },
    deleteTodo(index) {
      this.$apollo.mutate({
        mutation: deleteTodo,
        variables: {
          _eq: index,
        },
      });
      console.log("index : ", index);
    },
  },
  computed: {
    dataUser() {
      return this.$store.state;
    },
  },
  mounted() {},
};
</script>

<style>
</style>