<template>
  <section class="main">
    <input class="toggle-all" type="checkbox" :checked="store.state.allTodosComplete"/>
    <label for="toggle-all" @click.prevent="handleToggle">Mark all as complete</label>
    <ul class="todo-list">
      <Todo v-for="todo in todos" :key="todo.id" :todo="todo"/>
    </ul>
  </section>
</template>

<script>
import Todo from './Todo.vue';
import { computed, inject } from 'vue'

export default {
  name: 'TodoList',

  components: { Todo },

  setup() {
    const store = inject('store');

    const todos = computed(() => {
      if (store.state.filter === 'active') {
        return store.state.activeTodos;
      }

      if (store.state.filter === 'completed') {
        return store.state.completedTodos;
      }

      return store.state.todos;
    });

    return {
      store,
      todos,

      handleToggle(e) {
        store.editAllTodos({ completed: !store.state.allTodosComplete });
      },
    };
  },
}
</script>
