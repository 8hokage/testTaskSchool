import { combineReducers, configureStore } from '@reduxjs/toolkit';
import classReducer, { IClassState } from './slices/class/classReducer';
import uiReducer, { IUIState } from './slices/ui/uiReducer';

export interface IState {
  class: IClassState;
  ui: IUIState;
}

const rootReducer = combineReducers({
  class: classReducer,
  ui: uiReducer,
});

export default configureStore({
  reducer: rootReducer,
});
