import { createSlice } from '@reduxjs/toolkit';
import { IState } from '../../store';

export interface IUIState {
  error: ''
}

export const initialState = {
  error: '',
}

export const classSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    showError: (state, action) => {
      state.error = action.payload;
    },
    closeError: (state) => {
      state.error = '';
    }
  },
});

export const errorSelector = (state: IState) => {
  return state.ui.error;
}

export const { showError, closeError } = classSlice.actions;
export default classSlice.reducer;