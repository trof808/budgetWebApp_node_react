import { createStore, combineReducers } from 'redux';
import { action_types } from './actions'

const addCount = (list = [], action) => {
  switch(action.type) {
    case action_types.ADD_COUNT:
      return [...list, action.count];
    case action_types.DELETE_COUNT:
      return list.filter(o => o.id !== action.id);
    default:
      return list;
  }
};

const changeModalContent = (obj = {}, action) => {
  switch(action.type) {
    case action_types.CHANGE_MODAL:
      return {...obj, typeCount: action.typeCount, title: action.title};
    default:
      return obj;
  }
}

const reducers = combineReducers({
  addCount,
  changeModalContent
});

export const store = createStore(reducers);
