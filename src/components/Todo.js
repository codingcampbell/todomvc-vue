import Vue from 'vue';
import Store from '../Store';

export default Vue.extend({
  name: 'Todo',

  props: {
    todo: { required: true },
  },

  data() {
    return {
      editing: false,
      store: Store,
    };
  },

  methods: {
    handleCheck(e) {
      e.preventDefault();
      this.todo.completed = e.target.checked;
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
        this.save();
      }
    },
    remove() {
      Store.$emit('remove-todo', this.todo);
    },
    save() {
      this.editing = false;
      const value = this.$refs.editInput.value.trim();
      if (!value.length) {
        this.remove();
      }

      this.todo.task = value;
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
