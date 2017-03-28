import Vue from 'vue';
import Store from '../Store';

export default Vue.extend({
  name: 'Header',

  data() {
    return {
      unwatch: null,
    }
  },

  methods: {
    handleInput(e) {
      Store.inputTask = e.target.value;
    },
  },

  mounted() {
    this.unwatch = Store.$watch('inputTask', value => { this.$refs.input.value = value; });
  },

  destroyed() {
    this.unwatch();
  },

  render() {
    return <header class="header">
      <h1>todos</h1>
      <input
        ref="input"
        class="new-todo"
        placeholder="What needs to be done?"
        autofocus
        value={Store.inputTask}
        onInput={this.handleInput}/>
    </header>;
  }
});
