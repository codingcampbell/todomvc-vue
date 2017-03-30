import Vue from 'vue';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

export default Vue.extend({
  name: 'App',

  computed: {
    todos() {
      return this.$store.state.todos;
    },
  },

  mounted() {
    const store = this.$store;

    window.addEventListener('hashchange', () => store.commit('getFilterFromURL'));

    store.dispatch('loadTodos');
    store.commit('getFilterFromURL');
    store.subscribe(() => store.dispatch('saveTodos'));
  },

  render() {
    return <section class="todoapp">
      <Header/>
      { !this.todos.length === 0 ? null : <TodoList/> }
      { !this.todos.length === 0 ? null : <Footer/> }
    </section>
  }
});
