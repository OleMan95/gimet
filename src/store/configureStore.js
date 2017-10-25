import {createStore} from 'redux';
import rootReducer from '../reducers';

// Функция configureStore создает и возвращает store.
export default function configureStore(initialState){

  // В createStore передается rootReducer и initialState.
  // rootReducer обьеденяет все редюсеры в этом приложении.
  // initialState - начальное состояние store приложения.
  const store = createStore(rootReducer, initialState);

  return store;
}
