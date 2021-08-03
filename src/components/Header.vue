<template>
  <header class="header">
    <h1>todos</h1>
    <form @submit.prevent="handleSubmit">
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autofocus
        v-model="inputTask"/>
    </form>
  </header>
</template>

<script>
import { inject, ref } from 'vue'

export default {
  setup() {
    const inputTask = ref('');
    const store = inject('store');

    return {
      inputTask,

      handleSubmit(e) {
        store.addTodo({ task: this.inputTask });
        inputTask.value = '';
      },
    }
  },
}
</script>
