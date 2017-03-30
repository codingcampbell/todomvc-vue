import Vue from 'vue';

export default Vue.extend({
  name: 'Todo',

  props: {
    todo: { required: true },
  },

  data() {
    return {
      editing: false,
    };
  },

  methods: {
    handleCheck(e) {
      e.preventDefault();
      this.$store.commit('toggleTodo', { todo: this.todo, completed: e.target.checked });
    },

    handleEdit(e) {
      e.preventDefault();
      this.editing = true;
      Vue.nextTick(() => { this.$refs.editInput.focus(); });
    },

    handleKeyUp(e) {
      if (e.keyCode === 27) { // ESC to cancel
        this.editing = false;
      } else if (e.keyCode === 13) { // Return to submit
        e.target.blur(); // will trigger a save()
      }
    },

    remove() {
      this.$store.commit('removeTodo', this.todo);
    },

    save() {
      this.editing = false;
      const task = this.$refs.editInput.value.trim();
      if (!task.length) {
        this.remove();
      }

      this.$store.commit('editTodo', { todo: this.todo, task });
    },
  },

  render() {
    return <li class={{completed: this.todo.completed, editing: this.editing}}>
      <div class="view">
        <input class="toggle" type="checkbox" onChange={this.handleCheck} domPropsChecked={this.todo.completed}/>
        <label onDblclick={this.handleEdit}>{this.todo.task}</label>
        <button class="destroy" onClick={this.remove}></button>
      </div>
      <input
        ref="editInput"
        class="edit"
        domPropsValue={this.todo.task}
        onBlur={this.save}
        onKeyup={this.handleKeyUp}/>
    </li>;
  }
});
