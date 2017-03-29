import Vue from 'vue';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import Store from './Store';

export default Vue.extend({
  name: 'App',

  render() {
    return <section class="todoapp">
      <Header/>
      { Store.todos.length === 0 ? null : <TodoList/> }
      { Store.todos.length === 0 ? null : <Footer/> }
    </section>
  }
});
