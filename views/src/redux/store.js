import { createStore } from 'redux';
import rootReducer from './reducers'; // We'll create this later

const store = createStore(rootReducer);

export default store;

