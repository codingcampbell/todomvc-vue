<template>
  <li :class="{completed: todo.completed, editing: isEditing}">
    <div class="view">
      <input class="toggle" type="checkbox" @change.prevent="handleCheck" :checked="todo.completed"/>
      <label @dblclick.prevent="handleEdit">{{todo.task}}</label>
      <button class="destroy" @click="remove"></button>
    </div>
    <input
      ref="editInput"
      class="edit"
      :value="todo.task"
      @blur="save"
      @keyup="handleKeyUp"/>
  </li>
</template>

<script>
import { ref, inject, toRefs, nextTick } from 'vue'

export default {
  name: 'Todo',

  props: {
    todo: { required: true },
  },

  setup(props) {
    const store = inject('store');
    const isEditing = ref(false);
    const editInput = ref(null);
    const { todo } = toRefs(props);

    const remove = () => {
      store.removeTodo(todo);
    };

    return {
      store,
      isEditing,
      editInput,

      handleCheck(e) {
        store.toggleTodo({ todo, completed: e.target.checked });
      },

      handleEdit(e) {
        isEditing.value = true;
        nextTick(() => { editInput.value.focus(); });
      },

      handleKeyUp(e) {
        if (e.keyCode === 27) { // ESC to cancel
          isEditing.value = false;
        } else if (e.keyCode === 13) { // Return to submit
          e.target.blur(); // will trigger a save()
        }
      },

      remove,

      save() {
        isEditing.value = false;
        const task = editInput.value.value.trim();
        if (!task.length) {
          this.remove();
        }

        store.editTodo({ todo: todo, task });
      },
    };
  },
}
</script>
