import Vue from 'vue';

export default Vue.extend({
  name: 'Header',

  data() {
    return {
      inputTask: '',
    };
  },

  methods: {
    handleInput(e) {
      this.inputTask = e.target.value;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.$store.commit('addTodo', { task: this.inputTask });
      this.inputTask = '';
    },
  },

  render() {
    return <header class="header">
      <h1>todos</h1>
      <form onSubmit={this.handleSubmit}>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          autofocus
          domPropsValue={this.inputTask}
          onInput={this.handleInput}/>
      </form>
    </header>;
  }
});
