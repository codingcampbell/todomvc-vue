import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import Store from './Store';

import '../node_modules/todomvc-common/base.js';
import './styles/styles.scss';

Vue.config.productionTip = false;
Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: new Vuex.Store(Store),
  render(h) {
    return <div>
      <App/>
      <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="https://mattcampbell.net">Matt Campbell</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </div>;
  }
});
