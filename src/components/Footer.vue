<template>
  <footer class="footer">
    <span class="todo-count"><strong>{{itemsLeft}}</strong> {{itemsLeft === 1 ? 'item' : 'items'}} left</span>
    <ul class="filters">
      <li>
        <a :class="{selected: !store.state.filter}" href="#/">All</a>
      </li>
      <li>
        <a :class="{selected: store.state.filter === 'active'}" href="#/active">Active</a>
      </li>
      <li>
        <a :class="{selected: store.state.filter === 'completed'}" href="#/completed">Completed</a>
      </li>
    </ul>

    <button v-if="store.state.completedTodos.length !== 0" class="clear-completed" @click="clearCompleted">Clear completed</button>
  </footer>
</template>

<script>
import { computed, inject } from 'vue'

export default {
  name: 'Footer',
  setup() {
    const store = inject('store');
    const itemsLeft = computed(() => store.state.activeTodos.length);

    return {
      store,
      itemsLeft,

      clearCompleted(e) {
        store.clearCompletedTodos();
      },
    };
  },
}
</script>
