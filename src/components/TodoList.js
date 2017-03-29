import Vue from 'vue';
import Store from '../Store';

export default Vue.extend({
  name: 'TodoList',

  render() {
    /* These are here just to show the structure of the list items */
    /* List items should get the class `editing` when editing and `completed` when marked as completed */

    return Store.todos.length === 0 ? null : <section class="main">
      <input class="toggle-all" type="checkbox"/>
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        { Store.todos.map(todo => 
          <li key={todo.id} class={{completed: todo.completed}}>
            <div class="view">
              <input class="toggle" type="checkbox" domPropsChecked={todo.completed}/>
              <label>{todo.task}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" domPropsValue={todo.task}/>
          </li>
        )}
      </ul>
    </section>;
  }
});
