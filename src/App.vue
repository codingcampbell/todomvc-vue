<template>
  <Header/>
  <TodoList v-if="store.state.todos.length !== 0"/>
  <Footer v-if="store.state.todos.length !== 0"/>
</template>

<script>
import { provide, reactive, computed, ref, watch, onMounted } from 'vue'
import Header from './components/Header.vue'
import TodoList from './components/TodoList.vue'
import Footer from './components/Footer.vue'
import store from './store.js';

export default {
  components: {
    Header,
    TodoList,
    Footer,
  },
  setup() {
    provide('store', store);

    watch(() => ({...store.state}), val => {
      store.saveTodos();
    });

    onMounted(() => {
      store.getFilterFromURL();

      window.addEventListener('hashchange', () => {
        store.getFilterFromURL();
      });

      store.loadTodos();
    });

    return {
      store,
    };
  },
}
</script>

<style>
@import 'todomvc-app-css/index.css';
</style>
