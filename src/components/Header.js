import Vue from 'vue';
import Store from '../Store';

export default Vue.extend({
  name: 'Header',

  methods: {
    handleInput(e) {
      Store.inputTask = e.target.value;
    },
    handleSubmit(e) {
      e.preventDefault();
      Store.$emit('add-todo');
    },
  },

  render() {
    return <header class="header">
      <h1>todos</h1>
      <form onSubmit={this.handleSubmit}>
        <input
          ref="input"
          class="new-todo"
          placeholder="What needs to be done?"
          autofocus
          domPropsValue={Store.inputTask}
          onInput={this.handleInput}/>
      </form>
    </header>;
  }
});
